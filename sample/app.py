# Sample Python file for Secrets-LE testing
# NOTE: These are SAFE EXAMPLE PATTERNS only - not real secrets

import os

# Configuration dictionary with secrets
config = {
    'api_key': 'sk_live_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345',
    'aws_access_key_id': 'AKIAIOSFODNN7EXAMPLE',
    'aws_secret_access_key': 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    'database_password': 'mysecretpassword123',
    'github_token': 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'jwt_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example',
    'api_secret': 'sk_test_EXAMPLE_TEST_PATTERN_1234567890'
}

# Direct assignments
api_key = "sk_live_example_key_1234567890abcdef"
password = "mypassword123"
secret_key = "mysecretkey456"

# AWS credentials
AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

# Database URL with credentials
DATABASE_URL = "postgresql://admin:secretpass123@localhost:5432/mydb"
MONGODB_URL = "mongodb://admin:password123@cluster.example.com:27017/dbname"

# Function with secrets
def authenticate(api_key="AKIAIOSFODNN7EXAMPLE", password="mypassword123"):
    """Authenticate with API."""
    pass

# Environment variables
os.environ['API_KEY'] = 'sk_live_example123456789'
os.environ['DATABASE_PASSWORD'] = 'dbpassword456'
os.environ['SECRET_KEY'] = 'my_very_long_secret_key_that_should_be_detected'

# Comments with secrets (sometimes found in code)
# api_key = "sk_live_abcd1234efgh5678"  # TEMPORARY - remove before commit
# password = "admin123"  # Default password

