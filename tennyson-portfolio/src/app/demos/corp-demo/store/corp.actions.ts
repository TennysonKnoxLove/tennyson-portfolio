import { createAction, props } from '@ngrx/store';
import { corpView, MessageLog } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from './corp.state';

// View Actions
export const switchView = createAction(
  '[corp] Switch View',
  props<{ view: corpView }>()
);

export const toggleFullscreen = createAction(
  '[corp] Toggle Fullscreen'
);

// Selection Actions
export const setSelectedBox = createAction(
  '[corp] Set Selected Box',
  props<{ boxId: string }>()
);

export const setSelectedSlot = createAction(
  '[corp] Set Selected Slot',
  props<{ slotId: string }>()
);

// SMS Actions (Demo)
export const sendSMSDemo = createAction(
  '[corp] Send SMS Demo',
  props<{ smsForm: SMSForm }>()
);

export const sendSMSDemoSuccess = createAction(
  '[corp] Send SMS Demo Success',
  props<{ messageLog: MessageLog }>()
);

export const sendSMSDemoFailure = createAction(
  '[corp] Send SMS Demo Failure',
  props<{ error: string }>()
);

// Filter Actions
export const setDateFilter = createAction(
  '[corp] Set Date Filter',
  props<{ startDate: string; endDate: string }>()
);

export const setNumberFilters = createAction(
  '[corp] Set Number Filters',
  props<{ fromNumber: string; toNumber: string }>()
);

// Webhook Actions (Demo)
export const openWebhookModal = createAction(
  '[corp] Open Webhook Modal'
);

export const closeWebhookModal = createAction(
  '[corp] Close Webhook Modal'
);

export const createWebhookDemo = createAction(
  '[corp] Create Webhook Demo',
  props<{ webhookForm: WebhookForm }>()
);

export const createWebhookDemoSuccess = createAction(
  '[corp] Create Webhook Demo Success',
  props<{ successMessage: string }>()
);

export const createWebhookDemoFailure = createAction(
  '[corp] Create Webhook Demo Failure',
  props<{ error: string }>()
);

export const closeWebhookSuccessModal = createAction(
  '[corp] Close Webhook Success Modal'
);

// Export Actions (Demo)
export const exportToCSVDemo = createAction(
  '[corp] Export To CSV Demo'
);

// Reset Actions
export const resetcorpState = createAction(
  '[corp] Reset State'
);

export const clearError = createAction(
  '[corp] Clear Error'
); 