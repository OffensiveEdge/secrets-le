// Sample JavaScript file for Secrets-LE testing
// NOTE: These are SAFE EXAMPLE PATTERNS only - not real secrets

const config = {
  // Generic API key
  apiKey: "sk_live_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345",
  
  // AWS Access Key ID (example format)
  awsAccessKeyId: "AKIAIOSFODNN7EXAMPLE",
  
  // AWS Secret Access Key (example format)
  awsSecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  
  // Database password
  databasePassword: "mysecretpassword123",
  
  // GitHub Personal Access Token (example format)
  githubToken: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  
  // JWT token (example format)
  jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  
  // OAuth token
  oauthToken: "ya29.a0AfH6SMBx...example...token",
  
  // API secret
  apiSecret: "sk_test_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345",
  
  // Database URL
  databaseUrl: "postgresql://admin:secretpass123@localhost:5432/mydb",
  
  // Connection string
  connectionString: "mongodb://admin:password123@cluster.example.com:27017/dbname"
};

// Function with secrets in parameters
function authenticateUser(apiKey = "AKIAIOSFODNN7EXAMPLE", password = "mypassword123") {
  // Authentication logic
  return true;
}

// Environment variables style
const env = {
  AWS_ACCESS_KEY_ID: "AKIAIOSFODNN7EXAMPLE",
  AWS_SECRET_ACCESS_KEY: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  DATABASE_PASSWORD: "dbpassword456",
  API_KEY: "sk_live_example123456789"
};

// Export with secrets
module.exports = {
  config,
  apiKey: "sk_live_example_key_1234567890abcdef",
  secret: "my_very_long_secret_key_that_should_be_detected_12345"
};

