# EPIC 2 UX Enhancements

This document defines additional user stories for improving the User Interface of Epic 2. They address usability gaps in the current implementation (`tasks/epic2.md`) and align with the JSON driven architecture described in `README.md`, `prjct.md`, and `PO_review.txt`.

## Story 1 – Apply a CSS Framework
**As a** clinician using the app
**I want** the login page, dashboard and SOAP form to use a standardized visual style (e.g., Bootstrap)
**So that** forms are easy to read and interact with even in this proof of concept

*Tasks*
- Integrate Bootstrap (or equivalent) into the React frontend
- Replace raw HTML elements with styled components (buttons, form groups, grid)
- Ensure layout remains responsive across common devices

*Acceptance Criteria*
- Bootstrap styles are loaded globally
- All existing screens use Bootstrap classes for a clear, professional appearance
- Form elements are aligned and readable on desktop and tablet resolutions

## Story 2 – Load Option Dictionaries From Backend
**As a** clinician filling out a SOAP note
**I want** the dropdown and checklist options (Disposition, Activities/Materials, etc.) to be provided by the backend
**So that** the lists can be updated centrally without code changes on the frontend

*Tasks*
- Create backend endpoints that return JSON dictionaries for each option list
- Fetch these dictionaries on form load
- Replace all hard‑coded arrays in `SoapForm.js` with dynamically loaded data

*Acceptance Criteria*
- Option data is retrieved via API requests
- Form controls display the fetched options correctly
- The UI still functions when additional options are added in the backend JSON

## Story 3 – Dynamic Section Loader
**As a** clinician navigating the app
**I want** available SOAP sections to be driven by a configuration file (e.g., `sections.json`) served by the backend
**So that** new sections can be enabled or disabled without changing the frontend code

*Tasks*
- Create a `sections.json` file on the backend with entries like:
  ```json
  [
    { "code": "SUBJECTIVE", "label": "Subjective" },
    { "code": "OBJECTIVE", "label": "Objective", "enabled": false }
  ]
  ```
- Fetch this configuration when the app loads
- Render navigation tabs or routes based on the enabled sections
- Adjust form rendering to read a per‑section input configuration file

*Acceptance Criteria*
- The UI displays a tab or route for each section marked `enabled: true`
- Updating `sections.json` on the backend reflects in the frontend without rebuilding
- Each section loads its own set of inputs from a JSON descriptor

## Story 4 – Section‑Scoped Phrase Banks
**As a** clinician entering notes
**I want** the phrase bank to show phrases related only to the active section
**So that** suggestions are relevant and clutter is reduced

*Tasks*
- Divide phrase bank content into JSON files per section (e.g., `phrasebanks/subjective.json`)
- When a section is active, load its phrase list
- Update the PhraseBank component to accept a list of phrases rather than using a global constant

*Acceptance Criteria*
- The phrase bank displays phrases from the currently selected section
- Switching sections loads a different phrase list
- No global phrase list remains in the React code

## Story 5 – Dedicated Phrase Search Per Section
**As a** clinician writing within a section
**I want** a search box tied to that section’s phrase bank
**So that** I can quickly filter and insert phrases specific to my current text area

*Tasks*
- Include a search input alongside each text area that supports phrase insertion
- Filter the section’s phrase list based on the search query
- Insert the selected phrase into the currently focused text field

*Acceptance Criteria*
- Every phrase‑bank enabled text area has its own search box
- Typing in the search box filters phrases in that section only
- Clicking a phrase inserts it at the cursor position of the corresponding text area

