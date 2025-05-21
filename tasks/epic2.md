# EPIC 2: User Interface Development

## Overview
This EPIC focuses on building the front-end components required to collect structured patient information and interact with the AI. It includes the login page, dashboard, SOAP note entry form and phrase bank features described in the project context.

## User Stories

### 1. Basic Login Page
**As a** clinician
**I want to** sign in with hardcoded credentials
**So that** access to the application is restricted

**Tasks:**
- [ ] Create a simple login form with username and password fields
- [ ] Validate credentials on the frontend
- [ ] Display an error message for invalid credentials
- [ ] Redirect to the dashboard on successful login

**Acceptance Criteria:**
- Valid hardcoded credentials allow login
- Invalid credentials show an error message
- Successful login redirects to the dashboard

### 2. Dashboard Layout
**As a** clinician
**I want to** see a dashboard after logging in
**So that** I can start a new SOAP note quickly

**Tasks:**
- [ ] Design a minimal dashboard layout
- [ ] Add a button to create a new SOAP note
- [ ] Include a placeholder area for future features

**Acceptance Criteria:**
- Dashboard loads after login
- User can navigate to the SOAP note form
- Layout is responsive across common screen sizes

### 3. Structured SOAP Note Form
**As a** clinician
**I want to** capture patient session information using structured inputs
**So that** the LLM can generate notes efficiently

**Tasks:**
- [ ] Add checklists and dropdowns for all patient assessment components:
  - [ ] Disposition (multiple selection)
  - [ ] Activities/materials (multiple selection)
  - [ ] Setting/context (single selection)
  - [ ] Interaction style (multiple selection)
  - [ ] Language modality (multiple selection)
- [ ] Add assessment metrics dropdowns:
  - [ ] Engagement level
  - [ ] Cooperation level
  - [ ] Primary focus
- [ ] Provide text areas with phrase bank integration for:
  - [ ] Communication examples
  - [ ] Difficulties/errors
  - [ ] Unique observations
  - [ ] Transition notes
- [ ] Implement basic form submission to send data for processing

**Acceptance Criteria:**
- All fields from the project context are present and match the specified input types
- Phrase bank integration is available in each text area
- Submitted form data is available for the backend/LLM

### 4. Phrase Bank with Text Editing
**As a** clinician
**I want to** insert professional phrases and edit AI text easily
**So that** my notes use consistent language

**Tasks:**
- [ ] Build a phrase bank component with type-search
- [ ] Provide default phrases and templates
- [ ] Enable insertion of phrases into any text area
- [ ] Allow editing of LLM output using phrase bank suggestions

**Acceptance Criteria:**
- Phrase bank displays suggestions and filters results by search query
- Clicking a phrase inserts it at the cursor position
- LLM output can be edited using phrase bank suggestions

### 5. Save Generated Note as Text
**As a** clinician
**I want to** save the final SOAP note as plain text
**So that** I can store it in patient records

**Tasks:**
- [ ] Add a "Save as Text" button
- [ ] Ensure the saved text reflects all edits
- [ ] Display a confirmation message when the note is saved

**Acceptance Criteria:**
- Clicking "Save as Text" downloads or copies the note as plain text
- Saved text includes all edits and inserted phrases
- User receives confirmation of a successful save

## Dependencies
- EPIC 1: Core Application Setup

## Definition of Done
- All acceptance criteria for each user story are met
- UI components function together as described
