# University Connect Demo Implementation Plan

## 1. Overview

The University Connect demo will highlight features such as Calendar OAuth, Stripe Connect, and NgRx (Store + Facade). The key interactive element for this demo will be the ability for users to **simulate uploading a new resource** (e.g., a study space, equipment, etc.).

## 2. Core Features from Main Plan

- Showcase of Calendar OAuth, Stripe Connect integration concepts (can be mocked/simulated).
- Use of NgRx (Store + Facade) for state management in the demo.
- Interactive flow for a user to upload a new resource, including fields for image, description, tags, location, availability, and price.

## 3. Implementation Steps

### Phase 1: Frontend - Resource Upload Form (Angular)

- Create Angular components for:
  - The resource upload form.
  - Input fields for all resource attributes (image upload mock, text inputs for desc, tags, location details, availability selection, price).
  - A display area or list to show "uploaded" resources (managed locally in the frontend state).
- Use Material UI for form elements and layout.
- Implement client-side form validation (e.g., required fields, data types).

### Phase 2: Frontend - State Management (NgRx)

- **Store Setup:**
  - Define an NgRx store slice for managing resources within the demo.
  - Create actions for `addResource`, `loadResources` (initially empty or with mock data).
  - Create reducers to handle these actions and update the state.
  - Create selectors to get the list of resources.
- **Facade Service:**
  - Develop an Angular service (Facade) that abstracts the NgRx interactions for the components.
  - The facade will expose methods like `addNewResource(resourceData)` and an observable for `getResources()$.
- **Component Interaction:**
  - The resource upload form component will dispatch an `addResource` action (via the facade) upon successful form submission.
  - A separate component (or part of the same page) will subscribe to `getResources()` (via the facade) to display the list of locally added resources.

### Phase 3: Frontend - Mocking Integrations & Interactivity

- **Resource Upload:**
  - When a user submits the form, the data is added to the NgRx store, and the UI updates to show the new resource in a list. No actual backend upload will occur.
  - For image upload, simulate the upload process (e.g., show a placeholder image or the selected file name) without actual file transfer.
- **Calendar OAuth & Stripe Connect Simulation:**
  - Include UI elements (e.g., buttons like "Connect Calendar" or "Setup Stripe") that, when clicked, show a mock success message or a simulated modal/popup indicating the connection.
  - No actual OAuth flow or Stripe API calls will be made. The purpose is to demonstrate where these integrations would fit.
- **Displaying Resources:**
  - Ensure newly added (mocked) resources are displayed clearly, perhaps as cards with their details.

### Phase 4: Polish and Refinement

- Ensure the form is user-friendly and provides good feedback.
- Style the resource display to be visually appealing.
- Add any necessary helper text or tooltips to guide the user through the demo.
- Confirm the NgRx state management is working as expected (e.g., using Redux DevTools if integrated).

## 4. Tech Stack

- **Frontend:** Angular (TypeScript), Vite, Material UI, NgRx (Store, Effects (optional, for async simulation if needed), Facade)
- **Mock Data:** Static JSON or TypeScript interfaces for resource structure.

## 5. What This Demo Will NOT Include

- Actual backend API for resource storage.
- Real user authentication or accounts.
- Functional Calendar OAuth or Stripe Connect integrations.
- Persistent storage of uploaded resources beyond the current session.

## 6. Success Criteria

- User can fill out and submit the resource upload form.
- The submitted resource data appears in a list or display area on the page.
- Mocked Calendar OAuth and Stripe Connect buttons provide simulated feedback.
- The NgRx store correctly manages the state of the demo resources.
- The demo clearly illustrates the intended user flow for resource uploading and the conceptual placement of external integrations.
