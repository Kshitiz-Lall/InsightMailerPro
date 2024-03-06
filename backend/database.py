from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from model import Base
import os



# CONNECTION_STRING_DB = os.getenv("CONNECTION_STRING_DB")
CONNECTION_STRING_DB ='postgresql://postgres:admin@localhost:5432/InsightMailerPro'
print('connection string',CONNECTION_STRING_DB)



# Create the SQLAlchemy engine
engine = create_engine(CONNECTION_STRING_DB)

# Create a session factory using the engine
Session = sessionmaker(bind=engine)

# Function to create the database tables
def create_tables():
    print('table are created.')
    Base.metadata.create_all(engine)


create_tables();

