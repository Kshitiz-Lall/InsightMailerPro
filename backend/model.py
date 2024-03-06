from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean, JSON
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()



# Define User table
class User(Base):
    __tablename__ = 'user'
    userId = Column(Integer, primary_key=True)
    name = Column(String)
    companyName = Column(String)
    mobileNumber = Column(String)
    companyEmail = Column(String, unique=True)
    personalEmail = Column(String, unique=True)
    password = Column(String)
    profilePictureUrl = Column(Text)
    dob = Column(DateTime)
    address = Column(String)
    employeeID = Column(Integer)
    # Define relationship to Organization
    organization_id = Column(Integer, ForeignKey('organization.organizationId'))
    organization = relationship("Organization", back_populates="users")

    

# Define Organization table
class Organization(Base):
    __tablename__ = 'organization'
    organizationId = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    # Define relationship to User
    users = relationship("User", back_populates="organization")

# Define Task table
class Task(Base):
    __tablename__ = 'task'
    taskId = Column(Integer, primary_key=True)
    taskName = Column(String)
    taskDescription = Column(String)
    generatedEmail = Column(String)
    responseFromMail = Column(String)
    taskDate = Column(String)
    userId = Column(Integer, ForeignKey('user.userId'))
    isTaskCompleted = Column(String)

# Define WeeklySummary table
class WeeklySummary(Base):
    __tablename__ = 'weekly_summary'
    wSummaryId = Column(Integer, primary_key=True)
    generatedSummary = Column(String)
    fromDate = Column(DateTime)
    endDate = Column(DateTime)
    monthName = Column(String)
    userId = Column(Integer, ForeignKey('user.userId'))

# Define MonthlySummary table
class MonthlySummary(Base):
    __tablename__ = 'monthly_summary'
    mSummaryId = Column(Integer, primary_key=True)
    generatedSummary = Column(String)
    fromDate = Column(DateTime)
    endDate = Column(DateTime)
    monthName = Column(String)
    userId = Column(Integer, ForeignKey('user.userId'))

# Define YearlySummary table
class YearlySummary(Base):
    __tablename__ = 'yearly_summary'
    ySummaryId = Column(Integer, primary_key=True)
    generatedSummary = Column(String)
    fromDate = Column(DateTime)
    endDate = Column(DateTime)
    monthName = Column(String)
    userId = Column(Integer, ForeignKey('user.userId'))

# Define taskGeneratedByAi table
class TaskGeneratedByAi(Base):
    __tablename__ = 'task_generated_by_ai'
    taskGeneratedDate = Column(DateTime, primary_key=True)
    userId = Column(Integer, ForeignKey('user.userId'), primary_key=True)
    task = Column(Integer)

# Define Project table
class Project(Base):
    __tablename__ = 'project'
    projectId = Column(Integer, primary_key=True)
    projectName = Column(String)
    projectDescription = Column(String)
    startDate = Column(DateTime)
    endDate = Column(DateTime)

# Define UserProject table
class UserProject(Base):
    __tablename__ = 'user_project'
    userProjectId = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey('user.userId'))
    projectId = Column(Integer, ForeignKey('project.projectId'))


