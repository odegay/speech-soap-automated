# Cloud Deployment

This project uses Google Cloud Build to deploy the backend to Cloud Run and the frontend to Firebase Hosting.

Secrets such as the OpenAI API key are loaded from **Google Secret Manager** when the application runs in Google Cloud. Locally, a `.env` file is used instead.

## Steps
1. Ensure the secret `OPENAI_API_KEY` exists in Secret Manager.
2. Configure Firebase Hosting and Cloud Run in your Google Cloud project.
3. Trigger Cloud Build using `gcloud builds submit`.
