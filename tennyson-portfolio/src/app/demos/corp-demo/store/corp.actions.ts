import { createAction, props } from '@ngrx/store';
import { corpView, MessageLog, BoxConfig, WebhookRecord, SmsReceipt } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from './corp.state';

export const switchView = createAction(
  '[corp] Switch View',
  props<{ view: corpView }>()
);

export const toggleFullscreen = createAction(
  '[corp] Toggle Fullscreen'
);

export const setSelectedBox = createAction(
  '[corp] Set Selected Box',
  props<{ boxId: string }>()
);

export const setSelectedSlot = createAction(
  '[corp] Set Selected Slot',
  props<{ slotId: string }>()
);

export const loadBoxes = createAction('[corp] Load Boxes');

export const loadBoxesSuccess = createAction(
  '[corp] Load Boxes Success',
  props<{ boxes: BoxConfig[] }>()
);

export const loadBoxesFailure = createAction(
  '[corp] Load Boxes Failure',
  props<{ error: string }>()
);

export const loadMessageLogs = createAction('[corp] Load Message Logs');

export const loadMessageLogsSuccess = createAction(
  '[corp] Load Message Logs Success',
  props<{ messageLogs: MessageLog[] }>()
);

export const loadMessageLogsFailure = createAction(
  '[corp] Load Message Logs Failure',
  props<{ error: string }>()
);

export const sendSms = createAction(
  '[corp] Send SMS',
  props<{ smsForm: SMSForm; boxId: string; slotId: string }>()
);

export const sendSmsSuccess = createAction(
  '[corp] Send SMS Success',
  props<{ messageLog: MessageLog; receipt: SmsReceipt }>()
);

export const sendSmsFailure = createAction(
  '[corp] Send SMS Failure',
  props<{ error: string }>()
);

export const clearSmsReceipt = createAction('[corp] Clear SMS Receipt');

export const setDateFilter = createAction(
  '[corp] Set Date Filter',
  props<{ startDate: string; endDate: string }>()
);

export const setNumberFilters = createAction(
  '[corp] Set Number Filters',
  props<{ fromNumber: string; toNumber: string }>()
);

export const openWebhookModal = createAction('[corp] Open Webhook Modal');

export const closeWebhookModal = createAction('[corp] Close Webhook Modal');

export const loadWebhooks = createAction('[corp] Load Webhooks');

export const loadWebhooksSuccess = createAction(
  '[corp] Load Webhooks Success',
  props<{ webhooks: WebhookRecord[] }>()
);

export const loadWebhooksFailure = createAction(
  '[corp] Load Webhooks Failure',
  props<{ error: string }>()
);

export const createWebhook = createAction(
  '[corp] Create Webhook',
  props<{ webhookForm: WebhookForm }>()
);

export const createWebhookSuccess = createAction(
  '[corp] Create Webhook Success',
  props<{ webhook: WebhookRecord }>()
);

export const createWebhookFailure = createAction(
  '[corp] Create Webhook Failure',
  props<{ error: string }>()
);

export const closeWebhookSuccessModal = createAction(
  '[corp] Close Webhook Success Modal'
);

export const resetcorpState = createAction('[corp] Reset State');

export const clearError = createAction('[corp] Clear Error');
