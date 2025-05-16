# Speech Therapy SOAP Notes Automation - Project Context

## Project Overview
The project aims to automate the Subjective section of speech therapy SOAP notes, reducing completion time to under 1 minute by replacing free-text writing with structured UI inputs and AI-generated narratives.

## Technical Stack
- Frontend: Web Application (Simplest framework suitable for PoC)
- Backend: Python
- AI: OpenAI's LLM
- Deployment: Google Cloud
- Authentication: Hardcoded credentials in backend code

## Core Features

### 1. Structured Input System
#### Patient Assessment Components
- **Disposition Selection**
  - Options: Engaged, Shy, Energetic, Tired, Distracted, Cooperative, Resistant
  - Type: Multiple selection

- **Activity/Material Selection**
  - Options: Blocks, Books, Puzzles, Art, Sensory Play, Following Directions, Card Decks, Conversational Play, Assessment
  - Type: Multiple selection

- **Setting/Context**
  - Options: Clinic Room, Classroom, Home, Group Setting, Individual Session
  - Type: Single selection

- **Interaction Style**
  - Options: Parallel play, Interactive play, Structured drill, Conversational, Assessment protocol
  - Type: Multiple selection

- **Language Modality**
  - Options: English, Bilingual (with language dropdown), Gestures, AAC
  - Type: Multiple selection

#### Assessment Metrics
- **Engagement Level**
  - Options: High, Moderate, Low, Variable
  - Type: Single selection

- **Cooperation Level**
  - Options: High, Moderate, Low, Variable
  - Type: Single selection

- **Primary Focus**
  - Options: Expressive Language, Receptive Language, Articulation, Pragmatics, Fluency, Feeding
  - Type: Single selection

#### Text Input Fields
- Communication Examples with the Phrase Bank System integration
- Noted Difficulties with the Phrase Bank System integration
- Unique Observations with the Phrase Bank System integration
- Transition Notes with the Phrase Bank System integration

### 2. Phrase Bank System
- Pre-defined professional phrases
- Common behavior descriptions
- Engagement level descriptions
- Template-based structures
- Type-search functionality
- Integration with text editor

### 3. LLM Integration
#### Input Processing
- Structured data collection
- Template-based prompt generation
- Professional language enforcement

#### Output Generation
- Coherent narrative creation
- Professional tone maintenance
- Patient name integration
- Editable output with phrase bank integration
- Save as text functionality

## Technical Requirements

### System Architecture
- Web-based application
- Stateless design
- JSON-based data structures
- No persistence layer required
- No caching required
- No backup mechanisms required
- Modular design for future extensibility:
  - Clear separation of concerns
  - Well-defined interfaces
  - Configurable components
  - Extensible data structures
- Local development support:
  - Full local environment setup
  - Local API endpoints
  - Local LLM integration
  - End-to-end testing capability

### Development Priorities
- User experience focus
- Extensibility
- Basic security implementation (hardcoded credentials)
- No scalability requirements (single user, monthly usage)
- No maintainability requirements
- No user privacy requirements
- No user security requirements
- Basic error handling with user notifications
- Future extensibility considerations:
  - Modular code structure
  - Clear API boundaries
  - Configurable components
  - Extensible data models
- Local development and testing:
  - Easy local setup
  - Comprehensive documentation
  - Testing utilities
  - Mock services where needed

### API Integration
- OpenAI API for LLM
- Basic authentication system (hardcoded credentials)
- Google Cloud deployment
- Basic error handling with user notifications

## Implementation Notes
- Focus on MVP functionality
- Prioritize user experience
- Maintain professional language standards
- Ensure quick note generation
- Support manual editing capabilities with phrase bank integration
- Simple "Save as Text" functionality
- Basic deployment pipeline
- Basic logging for error tracking and debugging


