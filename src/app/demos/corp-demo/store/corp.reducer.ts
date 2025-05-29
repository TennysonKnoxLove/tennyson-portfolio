import { createReducer, on } from '@ngrx/store';
import { corpState, initialcorpState } from './corp.state';
import * as corpActions from './corp.actions';
import { corpView } from '../types/corp-demo.types';

export const corpReducer = createReducer(
  initialcorpState,

  // View Actions
  on(corpActions.switchView, (state, { view }) => ({
    ...state,
    currentView: view
  })),

  on(corpActions.toggleFullscreen, (state) => ({
    ...state,
    isFullscreen: !state.isFullscreen
  })),

  // Selection Actions
  on(corpActions.setSelectedBox, (state, { boxId }) => ({
    ...state,
    selectedBox: boxId,
    selectedSlot: '' // Reset slot when box changes
  })),

  on(corpActions.setSelectedSlot, (state, { slotId }) => ({
    ...state,
    selectedSlot: slotId
  })),

  // SMS Actions (Demo)
  on(corpActions.sendSMSDemo, (state) => ({
    ...state,
    isSendingSMS: true,
    error: null
  })),

  on(corpActions.sendSMSDemoSuccess, (state, { messageLog }) => ({
    ...state,
    isSendingSMS: false,
    messageLogs: [messageLog, ...state.messageLogs],
    currentView: corpView.MESSAGE_LOG,
    error: null
  })),

  on(corpActions.sendSMSDemoFailure, (state, { error }) => ({
    ...state,
    isSendingSMS: false,
    error
  })),

  // Filter Actions
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

  // Webhook Actions (Demo)
  on(corpActions.openWebhookModal, (state) => ({
    ...state,
    showWebhookModal: true,
    error: null
  })),

  on(corpActions.closeWebhookModal, (state) => ({
    ...state,
    showWebhookModal: false
  })),

  on(corpActions.createWebhookDemo, (state) => ({
    ...state,
    isCreatingWebhook: true,
    error: null
  })),

  on(corpActions.createWebhookDemoSuccess, (state, { successMessage }) => ({
    ...state,
    isCreatingWebhook: false,
    showWebhookModal: false,
    showWebhookSuccessModal: true,
    webhookSuccessMessage: successMessage,
    error: null
  })),

  on(corpActions.createWebhookDemoFailure, (state, { error }) => ({
    ...state,
    isCreatingWebhook: false,
    error
  })),

  on(corpActions.closeWebhookSuccessModal, (state) => ({
    ...state,
    showWebhookSuccessModal: false,
    webhookSuccessMessage: ''
  })),

  // Reset Actions
  on(corpActions.resetcorpState, () => ({
    ...initialcorpState
  })),

  on(corpActions.clearError, (state) => ({
    ...state,
    error: null
  }))
); 