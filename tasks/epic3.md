# EPIC 3: LLM Integration

## Overview
This EPIC covers connecting the backend to OpenAI's API, generating SOAP notes from structured data and ensuring the feature can be executed locally for development and testing.

## User Stories

### 1. OpenAI API Connection
**As a** developer
**I want to** connect the backend to OpenAI using a configurable API key
**So that** we can request note text from the LLM

**Tasks:**
- [ ] Install `openai` in backend requirements
- [ ] Load the API key from `.env` and `.env.local`
- [ ] Implement `openai_client.generate_text(prompt: str) -> str`
- [ ] Provide a small script or unit test that verifies the connection locally

**Acceptance Criteria:**
- `generate_text` returns a string when the key is present
- An informative error is raised when no key is configured
- Developers can run a local test to confirm connectivity

### 2. Prompt Engineering System
**As a** developer
**I want to** generate prompts from structured form data
**So that** the LLM produces consistent and professional notes

**Tasks:**
- [ ] Create a prompt template table keyed by section and version
- [ ] Implement helper functions to merge user inputs into the templates
- [ ] Document the template format with examples
- [ ] Write unit tests for the prompt rendering

**Acceptance Criteria:**
- Rendering functions produce the expected prompt text for sample inputs
- New sections can be added by dropping a template file without code changes

### 3. Text Generation Endpoint
**As a** clinician
**I want to** request an AI-generated note from the frontend
**So that** I can quickly produce SOAP documentation

**Tasks:**
- [ ] Design `/api/generate` POST endpoint accepting `{section, schema_version, inputs}`
- [ ] Call `openai_client.generate_text` with the rendered prompt
- [ ] Return `{"text": "<generated>"}` on success
- [ ] Add unit tests for valid and invalid requests

**Acceptance Criteria:**
- Valid requests return HTTP 200 with the generated text
- Missing or invalid data returns HTTP 400
- OpenAI failures return HTTP 500 with a readable error message

### 4. Text Formatting Templates
**As a** clinician
**I want to** receive the note in a clean, consistent structure
**So that** it can be copied directly into patient records

**Tasks:**
- [ ] Define formatting rules for the generated text per section
- [ ] Apply formatting after the OpenAI response
- [ ] Add tests to verify the formatting logic

**Acceptance Criteria:**
- Generated notes follow the defined format
- Formatting functions are covered by tests

### 5. Error Handling and Notification
**As a** clinician
**I want to** be informed when generation fails
**So that** I can retry or adjust my input

**Tasks:**
- [ ] Catch exceptions from the OpenAI API
- [ ] Log the error details server side
- [ ] Return a user friendly error message in the API response

**Acceptance Criteria:**
- Errors from the LLM are logged
- The API responds with `{"error": "<message>"}` when a failure occurs
- The frontend displays the error message to the user

### 6. Phrase Bank Editing Integration
**As a** clinician
**I want to** edit the generated text with phrase bank suggestions
**So that** my notes maintain consistent professional language

**Tasks:**
- [ ] Expose a backend endpoint to fetch phrase lists per section
- [ ] Allow the generated text to be edited in the frontend with phrase insertion
- [ ] Document how phrase bank files are organized

**Acceptance Criteria:**
- Phrase bank entries are returned via API
- A clinician can insert phrases into the generated note
- Updates to phrase JSON files are reflected without code changes

### 7. Local Execution and Testing
**As a** developer
**I want to** run the entire LLM workflow on my machine
**So that** I can develop and test without cloud dependencies

**Tasks:**
- [ ] Provide `.env.local.example` with placeholders for the OpenAI key and ports
- [ ] Document running the backend with `python app.py` or `local_start.bat`
- [ ] Ensure unit tests mock OpenAI calls so they run offline
- [ ] Update README with a local testing section

**Acceptance Criteria:**
- Developers can start both servers locally following the documentation
- Tests pass without internet access by using mocks
- Environment variables control API keys and ports

## Dependencies
- EPIC 1: Core Application Setup
- EPIC 2: User Interface Development (for phrase bank integration)

## Success Criteria
- OpenAI API connection is established and working
- Prompt engineering system is implemented
- Text generation endpoint returns formatted notes
- Error handling provides clear feedback
- Phrase bank editing works with generated text
- All functionality can be run and tested locally
