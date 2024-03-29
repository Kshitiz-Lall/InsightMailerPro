from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, func
from model import User, Task, WeeklySummary, MonthlySummary, YearlySummary, TaskGeneratedByAi, Project, UserProject, Organization
from datetime import datetime, timedelta
from werkzeug.security import check_password_hash
import jwt
from passlib.hash import bcrypt  # Importing bcrypt for password hashing
from serialize import serialize_user
import base64
import json


app = Flask(__name__)
CORS(app, origins="*")

CONNECTION_STRING_DB ='postgresql://postgres:admin@localhost:5432/InsightMailerPro'

# Configure SQLAlchemy
engine = create_engine(CONNECTION_STRING_DB)
Session = sessionmaker(bind=engine)
SECRET_KEY = "INSIGHT_MAILER"


@app.route('/login', methods=['POST'])
def login():
    session = Session()
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        print('email', email, 'password', password)
        # Check if email and password are provided
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Retrieve user from database
        user = session.query(User).filter(User.personalEmail == email).first()
        print('user', user)
        # Verify user existence and password correctness
        if user and bcrypt.verify(password, user.password):
            # Generate JWT token
            token = jwt.encode({
                'user_id': user.userId,
                'exp': datetime.utcnow() + timedelta(days=1)  # Token expiration time
            }, SECRET_KEY, algorithm='HS256')
            
            serialized_user = serialize_user(user)
            session.close()

            return jsonify({"token": token, "userData" : serialized_user}), 200
        else:
            session.close()
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        session.close()
        return jsonify({"error": str(e)}), 500
    

# Define APIs for User
@app.route('/getAllUsers', methods=['GET'])
def get_users():
    session = Session()
    users = session.query(User).all()
    serialized_users = [serialize_user(user) for user in users]
    session.close()
    return jsonify(serialized_users)


# Update the create_user function to include the additional validation
@app.route('/registerUser', methods=['POST'])
def create_user():
    session = Session()
    try:
        # Getting form data
        profile_picture = request.files.get('profilePicture')
        json_data = request.form.get('jsonData')
        
        # Convert the JSON data string back to a dictionary
        data = json.loads(json_data)

        # Check if organization exists
        organization_name = data.get('companyName')
        
        organization = session.query(Organization).filter(Organization.name == organization_name).first()

        if organization is None:
            # Organization does not exist, create a new one
            organization = Organization(name=organization_name, address=data.get('organizationAddress'))
            session.add(organization)
            session.commit()  # Commit the organization creation before proceeding

        # Check if employee ID is unique within the organization
        existing_user_with_employee_id = session.query(User).join(Organization).filter(
            User.employeeID == data.get('employeeID'), Organization.name == organization_name).first()
        if existing_user_with_employee_id:
            session.close()
            return 'Employee ID must be unique within the organization', 400
        
        # Hash the password
        hashed_password = bcrypt.hash(data.get('password'))

        # Base64 encode the profile picture
        profile_picture_base64 = None
        if profile_picture:
            profile_picture_base64 = base64.b64encode(profile_picture.read()).decode('utf-8')

        # Create a new user linked to the organization
        new_user = User(
            name=data.get('name'),
            companyName=organization_name,
            mobileNumber=data.get('mobileNumber'),
            companyEmail=data.get('companyEmail'),
            personalEmail=data.get('personalEmail'),
            password=hashed_password,
            profilePictureUrl=profile_picture_base64,
            dob=data.get('dob'),
            address=data.get('address'),
            employeeID=data.get('employeeID'),
            organization=organization
        )

        session.add(new_user)
        session.commit()

        # Return the user data along with the organization details
        response_data = serialize_user(new_user)

        session.close()
        return jsonify(response_data), 201
    except IntegrityError:
        session.rollback()
        session.close()
        return 'User already exists', 400

@app.route('/updateProfilePicture/<int:user_id>', methods=['PUT'])
def update_profile_picture(user_id):
    session = Session()
    try:
        # Get the user by user ID
        user = session.query(User).get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get the profile picture file from the request
        profile_picture = request.files.get('profilePicture')
        if not profile_picture:
            return jsonify({'error': 'Profile picture file is missing'}), 400
        
        # Base64 encode the profile picture
        profile_picture_base64 = base64.b64encode(profile_picture.read()).decode('utf-8')

        # Update the user's profile picture URL
        user.profilePictureUrl = profile_picture_base64
        
        # Commit the changes to the database
        session.commit()

        # Return success response
        return jsonify({'message': 'Profile picture updated successfully'}), 200
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()


@app.route('/getUser/<int:user_id>', methods=['GET'])
def get_user(user_id):
    session = Session()

    try:
        user = session.query(User).get(user_id)
        print('user', user)
        if not user:
            return 'User not found', 404
    
        userData = serialize_user(user)
        return jsonify(userData)
    finally:
        session.close()


@app.route('/updateUserProfile/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    session = Session()
    user = session.query(User).get(user_id)
    if not user:
        session.close()
        return 'User not found', 404
    data = request.json
    for key, value in data.items():
        setattr(user, key, value)
    session.commit()
    session.close()
    return jsonify(user.serialize())

@app.route('/deleteUser/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    session = Session()
    user = session.query(User).get(user_id)
    if not user:
        session.close()
        return 'User not found', 404
    session.delete(user)
    session.commit()
    session.close()
    return '', 204

# Define APIs for Task
@app.route('/tasks', methods=['GET'])
def get_tasks():
    session = Session()
    tasks = session.query(Task).all()
    session.close()
    return jsonify([task.serialize() for task in tasks])

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    # Validate input data
    if not all(key in data for key in ['taskName', 'taskDescription', 'taskDate', 'userId']):
        return 'Missing required fields', 400
    
    session = Session()
    try:
        new_task = Task(**data)
        session.add(new_task)
        session.commit()
        session.close()
        return jsonify(new_task.serialize()), 201
    except IntegrityError:
        session.rollback()
        session.close()
        return 'Error creating task', 400

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    session = Session()
    task = session.query(Task).get(task_id)
    session.close()
    if not task:
        return 'Task not found', 404
    return jsonify(task.serialize())

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    session = Session()
    task = session.query(Task).get(task_id)
    if not task:
        session.close()
        return 'Task not found', 404
    
    data = request.json
    # Validate input data
    if not all(key in data for key in ['taskName', 'taskDescription', 'taskDate', 'userId']):
        session.close()
        return 'Missing required fields', 400
    
    for key, value in data.items():
        setattr(task, key, value)
    session.commit()
    session.close()
    return jsonify(task.serialize())

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    session = Session()
    task = session.query(Task).get(task_id)
    if not task:
        session.close()
        return 'Task not found', 404
    session.delete(task)
    session.commit()
    session.close()
    return '', 204

@app.route('/tasks/user/<int:user_id>', methods=['GET'])
def get_tasks_by_user(user_id):
    session = Session()
    tasks = session.query(Task).filter(Task.userId == user_id).all()
    session.close()
    return jsonify([task.serialize() for task in tasks])

# Define APIs for generating weekly summary
@app.route('/weekly-summary/<int:user_id>', methods=['POST'])
def generate_weekly_summary(user_id):
    session = Session()
    try:
        # Get the current week's Monday
        today = datetime.today()
        monday = today - timedelta(days=today.weekday())
        
        # Get tasks for the current week (Monday to Friday)
        tasks = session.query(Task).filter(
            Task.userId == user_id,
            func.date(Task.taskDate) >= monday,
            func.date(Task.taskDate) <= monday + timedelta(days=4)
        ).all()
        
        # Process tasks to generate summary
        summary = ""
        for task in tasks:
            summary += f"- {task.taskName}\n"
        
        # Save the generated summary in WeeklySummary table
        weekly_summary = WeeklySummary(
            generatedSummary=summary,
            fromDate=monday,
            endDate=monday + timedelta(days=4),
            monthName=monday.strftime("%B"),
            userId=user_id
        )
        session.add(weekly_summary)
        session.commit()
        session.close()
        
        return jsonify({"message": "Weekly summary generated successfully"}), 201
    except Exception as e:
        session.rollback()
        session.close()
        return jsonify({"error": str(e)}), 500
    
    # Define API for generating monthly summary
@app.route('/monthly-summary/<int:user_id>', methods=['POST'])
def generate_monthly_summary(user_id):
    session = Session()
    try:
        # Get the current month's tasks
        today = datetime.today()
        first_day_of_month = today.replace(day=1)
        last_day_of_month = today.replace(day=28) + timedelta(days=4)
        last_day_of_month = last_day_of_month - timedelta(days=last_day_of_month.day)

        tasks = session.query(Task).filter(
            Task.userId == user_id,
            func.date(Task.taskDate) >= first_day_of_month,
            func.date(Task.taskDate) <= last_day_of_month
        ).all()
        
        # Process tasks to generate summary
        summary = ""
        for task in tasks:
            summary += f"- {task.taskName}\n"
        
        # Save the generated summary in MonthlySummary table
        monthly_summary = MonthlySummary(
            generatedSummary=summary,
            fromDate=first_day_of_month,
            endDate=last_day_of_month,
            monthName=first_day_of_month.strftime("%B"),
            userId=user_id
        )
        session.add(monthly_summary)
        session.commit()
        session.close()
        
        return jsonify({"message": "Monthly summary generated successfully"}), 201
    except Exception as e:
        session.rollback()
        session.close()
        return jsonify({"error": str(e)}), 500
    


# Define API for generating yearly summary
@app.route('/yearly-summary/<int:user_id>', methods=['POST'])
def generate_yearly_summary(user_id):
    session = Session()
    try:
        # Get the current year's tasks
        today = datetime.today()
        first_day_of_year = today.replace(month=1, day=1)
        last_day_of_year = today.replace(month=12, day=31)

        tasks = session.query(Task).filter(
            Task.userId == user_id,
            func.date(Task.taskDate) >= first_day_of_year,
            func.date(Task.taskDate) <= last_day_of_year
        ).all()
        
        # Process tasks to generate summary
        summary = ""
        for task in tasks:
            summary += f"- {task.taskName}\n"
        
        # Save the generated summary in YearlySummary table
        yearly_summary = YearlySummary(
            generatedSummary=summary,
            fromDate=first_day_of_year,
            endDate=last_day_of_year,
            monthName=first_day_of_year.strftime("%B"),
            userId=user_id
        )
        session.add(yearly_summary)
        session.commit()
        session.close()
        
        return jsonify({"message": "Yearly summary generated successfully"}), 201
    except Exception as e:
        session.rollback()
        session.close()
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)