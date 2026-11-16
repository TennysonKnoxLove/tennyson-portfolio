import { createReducer, on } from '@ngrx/store';
import { corpState, initialcorpState } from './corp.state';
import * as corpActions from './corp.actions';

export const corpReducer = createReducer(
  initialcorpState,

  on(corpActions.switchView, (state, { view }) => ({
    ...state,
    currentView: view
  })),

  on(corpActions.toggleFullscreen, (state) => ({
    ...state,
    isFullscreen: !state.isFullscreen
  })),

  on(corpActions.setSelectedBox, (state, { boxId }) => ({
    ...state,
    selectedBox: boxId,
    selectedSlot: ''
  })),

  on(corpActions.setSelectedSlot, (state, { slotId }) => ({
    ...state,
    selectedSlot: slotId
  })),

  on(corpActions.loadBoxesSuccess, (state, { boxes }) => ({
    ...state,
    boxes,
    loadError: null
  })),

  on(corpActions.loadBoxesFailure, (state, { error }) => ({
    ...state,
    loadError: error
  })),

  on(corpActions.loadMessageLogsSuccess, (state, { messageLogs }) => ({
    ...state,
    messageLogs
  })),

  on(corpActions.loadMessageLogsFailure, (state, { error }) => ({
    ...state,
    loadError: state.loadError ?? error
  })),

  on(corpActions.sendSms, (state) => ({
    ...state,
    isSendingSMS: true,
    error: null
  })),

  on(corpActions.sendSmsSuccess, (state, { messageLog, receipt }) => ({
    ...state,
    isSendingSMS: false,
    messageLogs: [messageLog, ...state.messageLogs],
    smsReceipt: receipt,
    error: null
  })),

  on(corpActions.sendSmsFailure, (state, { error }) => ({
    ...state,
    isSendingSMS: false,
    error
  })),

  on(corpActions.clearSmsReceipt, (state) => ({
    ...state,
    smsReceipt: null
  })),

  on(corpActions.setDateFilter, (state, { startDate, endDate }) => ({
    ...state,
    startDate,
    endDate
  })),

  on(corpActions.setNumberFilters, (state, { fromNumber, toNumber }) => ({
    ...state,
    fromNumberFilter: fromNumber,
    toNumberFilter: toNumber
  })),

  on(corpActions.openWebhookModal, (state) => ({
    ...state,
    showWebhookModal: true,
    error: null
  })),

  on(corpActions.closeWebhookModal, (state) => ({
    ...state,
    showWebhookModal: false
  })),

  on(corpActions.loadWebhooksSuccess, (state, { webhooks }) => ({
    ...state,
    webhooks,
    webhooksError: null
  })),

  on(corpActions.loadWebhooksFailure, (state, { error }) => ({
    ...state,
    webhooksError: error
  })),

  on(corpActions.createWebhook, (state) => ({
    ...state,
    isCreatingWebhook: true,
    error: null
  })),

  on(corpActions.createWebhookSuccess, (state, { webhook }) => ({
    ...state,
    isCreatingWebhook: false,
    showWebhookModal: false,
    showWebhookSuccessModal: true,
    createdWebhook: webhook,
    webhooks: [webhook, ...state.webhooks.filter(item => item.id !== webhook.id)],
    webhooksError: null,
    error: null
  })),

  on(corpActions.createWebhookFailure, (state, { error }) => ({
    ...state,
    isCreatingWebhook: false,
    error
  })),

  on(corpActions.closeWebhookSuccessModal, (state) => ({
    ...state,
    showWebhookSuccessModal: false,
    createdWebhook: null
  })),

  on(corpActions.resetcorpState, () => ({
    ...initialcorpState
  })),

  on(corpActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);
