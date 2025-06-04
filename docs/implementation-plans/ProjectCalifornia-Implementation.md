# Project California Demo Implementation Plan

## 1. Overview

The Project California demo will showcase an MVP execution, with a unique interactive element: a **Docker terminal simulation that spins up actual Docker containers**. Users will be able to type a command like `docker-compose up` into a mock terminal UI, which will trigger backend processes to run the corresponding Docker commands and display the output/container status on the site.

## 2. Core Features from Main Plan

- Demonstration of MVP execution from design to interactive UI.
- An interactive Docker terminal where users can input `docker-compose up`.
- Actual Docker containers for Project California will be spun up in the backend.
- The output (logs, container status) from the Docker process will be displayed to the user on the site.
- This functionality is specific to the Project California demo.

## 3. Implementation Steps

### Phase 1: Frontend - Mock Terminal UI (Angular)

- Create an Angular component for the mock terminal.
  - Include an input field for commands.
  - Design a display area for command output/logs.
- Style the terminal to look like a realistic (though simplified) command-line interface using Material UI or custom CSS.
- Implement basic command input handling (e.g., capturing the `docker-compose up` command).
- Ensure the terminal UI is responsive.

### Phase 2: Backend - Docker Interaction (Python/Prisma + Docker)

- **API Endpoint:**
  - Create a Python backend endpoint (e.g., `/api/California/docker/run`) that accepts the command from the frontend.
  - Secure this endpoint appropriately (e.g., ensure only specific commands like `docker-compose up` for Project California are processed).
- **Docker Execution Logic (Python Service):**
  - Write a service that, upon receiving the validated command:
    - Navigates to the correct directory for Project California's `docker-compose.yml` file.
    - Executes `docker-compose up -d` (or similar) using Python's `subprocess` module.
    - Captures `stdout` and `stderr` from the Docker process.
  - Implement logic to stream logs back to the frontend if possible (e.g., via WebSockets or long polling), or provide status updates.
  - Handle potential errors during Docker execution gracefully.
- **Container Management:**
  - Ensure that containers spun up for one user/session are isolated or managed to avoid conflicts (this might be complex; a simpler approach might be to have a predefined Project California stack that gets started/stopped).
  - Implement a mechanism to stop/clean up containers after a session or a certain period (e.g., `docker-compose down`).

### Phase 3: Frontend - Displaying Output & Container Status

- Connect the frontend terminal UI to the backend API endpoint.
- When a command is submitted:
  - Send it to the backend.
  - Display a "processing" or "starting containers..." message.
- Receive and display the logs/output from the backend in the terminal UI in real-time or periodically.
- Visually represent the status of the containers (e.g., "running", "stopped", "error").
- Provide a way for the user to "stop" or "reset" the Project California demo environment (triggering `docker-compose down` via another backend call).

### Phase 4: Integration and Polishing

- Ensure smooth communication between frontend and backend.
- Test the end-to-end flow thoroughly.
- Add clear instructions for the user on how to interact with the Docker terminal demo.
- Polish the UI/UX for clarity and a good user experience.

## 4. Tech Stack

- **Frontend:** Angular (TypeScript), Vite, Material UI
- **Backend:** Python (with FastAPI/Flask), Prisma (if needed for any state, otherwise not directly involved in Docker exec), Docker SDK for Python or `subprocess` module.
- **Containerization:** Docker, Docker Compose (for Project California itself).

## 5. What This Demo Will Include

- A functional mock terminal UI.
- Actual execution of `docker-compose up` for a predefined Project California application stack upon user command.
- Display of real-time or near real-time logs and container status from the backend.
- Ability to stop/reset the demo environment.

## 6. Success Criteria

- User can type `docker-compose up` (or a similar designated command) in the terminal.
- Backend successfully starts the Project California Docker containers.
- Frontend displays logs and status indicating the containers are running.
- User can see a visual representation of the running application (e.g., a link to the exposed port if applicable and safe, or just status messages).
- The interaction feels responsive and provides clear feedback.
