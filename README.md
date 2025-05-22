# tripmate

## Backend Setup

### OAuth2 Configuration

The application uses OAuth2 for authentication with Google and GitHub. Environment variables are used to securely manage OAuth credentials.

1. Copy the example environment file:
   ```bash
   cp backend/OAuth2/SpringOAuth2/.env.example backend/OAuth2/SpringOAuth2/.env
   ```

2. Edit the `.env` file and add your actual OAuth client credentials:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

3. The `.env` file is ignored by Git to prevent secrets from being committed to the repository.

### Running the Backend

To run the backend with environment variables loaded automatically:

```bash
cd backend/OAuth2/SpringOAuth2
./run.sh  # On Linux/macOS
# OR
run.bat   # On Windows
```

This will load the environment variables from your `.env` file and start the Spring Boot application.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```