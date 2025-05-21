#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
    # Load environment variables
    export $(grep -v '^#' .env | xargs)
    echo "Environment variables loaded from .env file"
else
    echo "Warning: .env file not found. Make sure to set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, and GITHUB_CLIENT_SECRET manually."
fi

# Run the Spring Boot application
./mvnw spring-boot:run