# EPIC 5: Deployment

## Overview
This EPIC covers the deployment of the application to Google Cloud while maintaining local development capabilities. The focus is on setting up a basic deployment pipeline and ensuring the application can run both locally and in Google Cloud with minimal configuration changes.
For the backend, we will use Google Cloud Run and for the frontend, we will use Firebase Hosting.

## User Stories

### US 5.1: Secret Management
As a developer, I want to securely manage API keys and tokens in Google Cloud so that sensitive information is not exposed in the codebase.

**Tasks:**
- [ ] Update backend configuration to use Google Secret Manager in cloud environment
- [ ] Maintain local .env file support for development
- [ ] Test secret management in both local and cloud environments
- [ ] Document secret management process

### US 5.2: Deployment Pipeline for Frontend to Google Cloud
As a developer, I want to automate the deployment process so that the frontend can be deployed consistently to Google Cloud as a Firebase Hosting site.

**Tasks:**
- [ ] Configure cloudbuild.yaml for automated builds for frontend
- [ ] Configure firebase.json for deployment of frontend
- [ ] Configure environment variables for frontend deployment
- [ ] Test deployment pipeline locally for frontend
- [ ] Document deployment process

### US 5.3: Deployment Pipeline for Backend to Google Cloud
As a developer, I want to automate the deployment process so that the backend can be deployed consistently to Google Cloud as a Google Cloud Run service.

**Tasks:**
- [ ] Configure cloudbuild.yaml for automated builds for backend
- [ ] Configure Dockerfile for deployment of backend
- [ ] Configure environment variables for backend deployment
- [ ] Test deployment pipeline locally for backend
- [ ] Document deployment process

### US 5.4: Environment Configuration
As a developer, I want to manage different environment configurations so that the application can run in both local and cloud environments.

**Tasks:**
- [ ] Create environment-specific configuration files
- [ ] Update backend to detect and use appropriate configuration
- [ ] Update frontend to use environment-specific API endpoints
- [ ] Test configuration in both local and cloud environments
- [ ] Document configuration management

### US 5.5: Basic Logging
As a developer, I want to implement basic logging so that I can monitor the application in production.

**Tasks:**
- [ ] Set up Google Cloud Logging
- [ ] Implement basic error logging in backend
- [ ] Implement basic request logging in backend
- [ ] Document logging implementation

### US 5.6: CI Testing for Deployments
As a developer, I want Cloud Build to run unit tests before deploying so that only passing code is released.

**Tasks:**
- [ ] Add frontend test step (e.g., `npm test`) to `cloudbuild.yaml`
- [ ] Ensure existing backend tests run during the pipeline
- [ ] Fail the build if any test fails
- [ ] Document the CI testing workflow

### US 5.7: Remove Legacy App Engine Configuration
As a developer, I want to deprecate the App Engine deployment files so that Cloud Run is the single deployment target.

**Tasks:**
- [ ] Archive or delete `app.yaml`
- [ ] Update `cloudbuild.yaml` to deploy the backend to Cloud Run
- [ ] Verify Dockerfile builds correctly
- [ ] Update documentation to reflect Cloud Run deployment

## Dependencies
- EPIC 1: Core Application Setup
- EPIC 2: User Interface Development
- EPIC 3: LLM Integration (Basic backend functionality is implemented in EPIC 3)


## Success Criteria
- Application can run both locally and in Google Cloud
- API keys and tokens are securely managed using Google Secret Manager
- Deployment pipeline successfully builds and deploys the application
- Basic logging is configured and working
- All deployment and configuration processes are documented
- Local development experience is not affected by cloud deployment

## Out of Scope
- All Google Cloud Project related Configurations are out of scope for this EPIC and should be handled manually.
- Authentication improvements
- Performance optimization
- Scalability features
- Monitoring and alerting
- Backup and recovery
- Security hardening
- Multi-user support 
