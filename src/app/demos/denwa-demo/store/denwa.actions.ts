import { createAction, props } from '@ngrx/store';
import { DenwaView, MessageLog } from '../types/denwa-demo.types';
import { SMSForm, WebhookForm } from './denwa.state';

// View Actions
export const switchView = createAction(
  '[Denwa] Switch View',
  props<{ view: DenwaView }>()
);

export const toggleFullscreen = createAction(
  '[Denwa] Toggle Fullscreen'
);

// Selection Actions
export const setSelectedBox = createAction(
  '[Denwa] Set Selected Box',
  props<{ boxId: string }>()
);

export const setSelectedSlot = createAction(
  '[Denwa] Set Selected Slot',
  props<{ slotId: string }>()
);

// SMS Actions (Demo)
export const sendSMSDemo = createAction(
  '[Denwa] Send SMS Demo',
  props<{ smsForm: SMSForm }>()
);

export const sendSMSDemoSuccess = createAction(
  '[Denwa] Send SMS Demo Success',
  props<{ messageLog: MessageLog }>()
);

export const sendSMSDemoFailure = createAction(
  '[Denwa] Send SMS Demo Failure',
  props<{ error: string }>()
);

// Filter Actions
export const setDateFilter = createAction(
  '[Denwa] Set Date Filter',
  props<{ startDate: string; endDate: string }>()
);

export const setNumberFilters = createAction(
  '[Denwa] Set Number Filters',
  props<{ fromNumber: string; toNumber: string }>()
);

// Webhook Actions (Demo)
export const openWebhookModal = createAction(
  '[Denwa] Open Webhook Modal'
);

export const closeWebhookModal = createAction(
  '[Denwa] Close Webhook Modal'
);

export const createWebhookDemo = createAction(
  '[Denwa] Create Webhook Demo',
  props<{ webhookForm: WebhookForm }>()
);

export const createWebhookDemoSuccess = createAction(
  '[Denwa] Create Webhook Demo Success',
  props<{ successMessage: string }>()
);

export const createWebhookDemoFailure = createAction(
  '[Denwa] Create Webhook Demo Failure',
  props<{ error: string }>()
);

export const closeWebhookSuccessModal = createAction(
  '[Denwa] Close Webhook Success Modal'
);

// Export Actions (Demo)
export const exportToCSVDemo = createAction(
  '[Denwa] Export To CSV Demo'
);

// Reset Actions
export const resetDenwaState = createAction(
  '[Denwa] Reset State'
);

export const clearError = createAction(
  '[Denwa] Clear Error'
); 