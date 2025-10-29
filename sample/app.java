// Sample Java file for Secrets-LE testing
// NOTE: These are SAFE EXAMPLE PATTERNS only - not real secrets

package com.example.app;

public class Config {
    // Constants with secrets
    private static final String API_KEY = "sk_live_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345";
    private static final String AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
    private static final String AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
    private static final String DATABASE_PASSWORD = "mysecretpassword123";
    
    // Instance variables
    private String apiKey;
    private String password;
    private String secretKey;
    
    // Constructor with secrets
    public Config() {
        this.apiKey = "sk_live_example_key_1234567890abcdef";
        this.password = "mypassword123";
        this.secretKey = "my_very_long_secret_key_that_should_be_detected_12345";
    }
    
    // Methods with secrets
    public boolean authenticate(String apiKey, String password) {
        String defaultKey = "AKIAIOSFODNN7EXAMPLE";
        String defaultPass = "mypassword123";
        return apiKey.equals(defaultKey) && password.equals(defaultPass);
    }
    
    // Configuration map
    private java.util.Map<String, String> config = new java.util.HashMap<String, String>() {{
        put("api_key", "sk_live_abcd1234efgh5678");
        put("aws_access_key_id", "AKIAIOSFODNN7EXAMPLE");
        put("password", "mysecretpassword123");
        put("database_url", "postgresql://admin:secretpass123@localhost:5432/mydb");
    }};
}

class DatabaseConnection {
    private String connectionString = "postgresql://admin:password123@localhost:5432/mydb";
    private String apiKey = "sk_live_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345";
}

