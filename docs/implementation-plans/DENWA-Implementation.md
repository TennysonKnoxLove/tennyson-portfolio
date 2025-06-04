# corp Demo Implementation Plan

## 1. Overview

The corp demo will showcase a real-time messaging UI. The key characteristic of this demo is that it will be a **UI-only click-around experience**. There will be no backend functionality; all interactions will be simulated on the frontend.

## 2. Core Features from Main Plan

- Real-time messaging UI simulation.
- Webhook routing (Slack/Discord) will be visually represented but not functional.
- Dockerized deployment (the concept can be mentioned, but the demo itself is UI-only).

## 3. Implementation Steps (Frontend Focus)

### Phase 1: UI Scaffolding (Angular)

- Create Angular components for:
  - Main chat interface
  - Contact list / Channel list
  - Message bubbles
  - Input area
- Design a visually appealing and intuitive messaging layout using Material UI.
- Ensure the UI is responsive.

### Phase 2: Mock Data and UI Logic

- Define static mock data for:
  - Contacts/Channels
  - Sample messages (including sender, timestamp, content)
- Implement Angular services to manage and serve this mock data to the components.
- Develop the client-side logic to:
  - Display lists of contacts/channels.
  - Show conversation history when a contact/channel is selected.
  - Simulate sending a new message (add it to the local UI, but it won't actually send anywhere).
  - Visually indicate "webhook routing" (e.g., an icon or a disabled button) without implementing the actual webhook.

### Phase 3: Interactivity & Styling

- Add click handlers to navigate between contacts/channels.
- Style message bubbles to differentiate between "sent" and "received" (all simulated).
- Implement a typing indicator simulation (optional, frontend-only).
- Polish the overall look and feel to match the "sleek" and "modern" aesthetic of the portfolio.

## 4. Tech Stack (for this demo)

- **Frontend:** Angular (TypeScript), Vite, Material UI
- **Mock Data:** Static JSON objects or TypeScript interfaces.

## 5. What This Demo Will NOT Include

- Actual real-time message sending/receiving.
- User authentication.
- Backend API calls for messaging.
- Functional webhook routing.
- Actual Docker container deployment for the demo interaction itself (though the project _description_ can mention its original Dockerized nature).

## 6. Success Criteria

- Users can click through different contacts/channels.
- Users can see pre-defined message histories.
- Users can type a message in an input field and see it appear in the chat window (locally).
- The UI is visually clear and representative of a messaging application.
- The "UI-only" nature is clear, preventing confusion about backend functionality.
