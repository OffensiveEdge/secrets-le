// Sample Go file for Secrets-LE testing
// NOTE: These are SAFE EXAMPLE PATTERNS only - not real secrets

package main

import (
	"os"
)

// Configuration struct
type Config struct {
	APIKey    string `json:"api_key"`
	Password  string `json:"password"`
	SecretKey string `json:"secret_key"`
}

// Variables with secrets
var (
	apiKey            = "sk_live_EXAMPLE_TEST_PATTERN_DO_NOT_USE_12345"
	awsAccessKeyID    = "AKIAIOSFODNN7EXAMPLE"
	awsSecretKey      = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
	databasePassword  = "mysecretpassword123"
	githubToken       = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
)

// Constants with secrets
const (
	DefaultAPIKey    = "sk_live_example_key_1234567890abcdef"
	DefaultPassword  = "mypassword123"
	ConnectionString = "postgresql://admin:secretpass123@localhost:5432/mydb"
)

// Configuration map
var config = map[string]string{
	"api_key":           "sk_live_abcd1234efgh5678",
	"aws_access_key_id": "AKIAIOSFODNN7EXAMPLE",
	"password":          "mysecretpassword123",
	"database_url":      "postgresql://admin:password123@localhost:5432/mydb",
}

// Function with secrets
func authenticate(apiKey string, password string) bool {
	defaultKey := "AKIAIOSFODNN7EXAMPLE"
	defaultPass := "mypassword123"
	// Authentication logic
	return apiKey == defaultKey && password == defaultPass
}

// Environment variables
func init() {
	os.Setenv("API_KEY", "sk_live_example123456789")
	os.Setenv("DATABASE_PASSWORD", "dbpassword456")
	os.Setenv("AWS_SECRET_ACCESS_KEY", "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY")
}

