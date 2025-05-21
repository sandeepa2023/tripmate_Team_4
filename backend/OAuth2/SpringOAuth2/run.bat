@echo off
echo Setting up environment variables...

:: Check if .env file exists
if exist .env (
    :: Read and set environment variables from .env file
    for /F "tokens=*" %%i in (.env) do (
        set %%i
    )
    echo Environment variables loaded from .env file
) else (
    echo Warning: .env file not found. Make sure to set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, and GITHUB_CLIENT_SECRET manually.
)

:: Run the Spring Boot application
mvnw.cmd spring-boot:run