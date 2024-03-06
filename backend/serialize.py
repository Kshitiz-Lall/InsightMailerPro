# serialize.py
from model import User

def serialize_user(user):
    # Convert User object to dictionary
    user_data = {
        'userId': user.userId,
        'name': user.name,
        'companyName': user.companyName,
        'mobileNumber': user.mobileNumber,
        'companyEmail': user.companyEmail,
        'personalEmail': user.personalEmail,
        'password': user.password,
        'profilePictureUrl': user.profilePictureUrl,
        'dob': user.dob.isoformat() if user.dob else None,
        'address': user.address,
        'employeeID': user.employeeID,
        'organization': {
            'organizationId': user.organization.organizationId,
            'organizationName': user.organization.name,
            'organizationAddress': user.organization.address
        }
    }
    return user_data