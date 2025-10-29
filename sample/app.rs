// Sample Rust file for Secrets-LE testing
// NOTE: These are SAFE EXAMPLE PATTERNS only - not real secrets

use std::env;

// Struct with secrets
struct Config {
    api_key: String,
    password: String,
    secret_key: String,
}

// Variables with secrets
let api_key = "sk_live_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345";
let aws_access_key_id = "AKIAIOSFODNN7EXAMPLE";
let aws_secret_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
let database_password = "mysecretpassword123";

// Constants with secrets
const DEFAULT_API_KEY: &str = "sk_live_EXAMPLE_TEST_PATTERN_1234567890abcdef";
const DEFAULT_PASSWORD: &str = "mypassword123";
const CONNECTION_STRING: &str = "postgresql://admin:secretpass123@localhost:5432/mydb";

// Configuration
let config = Config {
    api_key: "sk_live_abcd1234efgh5678".to_string(),
    password: "mysecretpassword123".to_string(),
    secret_key: "my_very_long_secret_key_that_should_be_detected_12345".to_string(),
};

// Function with secrets
fn authenticate(api_key: &str, password: &str) -> bool {
    let default_key = "AKIAIOSFODNN7EXAMPLE";
    let default_pass = "mypassword123";
    api_key == default_key && password == default_pass
}

// Environment variables
env::set_var("API_KEY", "sk_live_example123456789");
env::set_var("DATABASE_PASSWORD", "dbpassword456");
env::set_var("AWS_SECRET_ACCESS_KEY", "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY");

// String literals with secrets
let github_token = format!("ghp_{}", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
let jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example";

// HashMap with secrets
use std::collections::HashMap;
let mut secrets = HashMap::new();
secrets.insert("api_key", "sk_live_abcd1234efgh5678");
secrets.insert("password", "mysecretpassword123");

