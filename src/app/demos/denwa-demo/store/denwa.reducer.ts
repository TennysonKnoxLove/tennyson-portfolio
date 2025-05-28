import { createReducer, on } from '@ngrx/store';
import { DenwaState, initialDenwaState } from './denwa.state';
import * as DenwaActions from './denwa.actions';
import { DenwaView } from '../types/denwa-demo.types';

export const denwaReducer = createReducer(
  initialDenwaState,

  // View Actions
  on(DenwaActions.switchView, (state, { view }) => ({
    ...state,
    currentView: view
  })),

  on(DenwaActions.toggleFullscreen, (state) => ({
    ...state,
    isFullscreen: !state.isFullscreen
  })),

  // Selection Actions
  on(DenwaActions.setSelectedBox, (state, { boxId }) => ({
    ...state,
    selectedBox: boxId,
    selectedSlot: '' // Reset slot when box changes
  })),

  on(DenwaActions.setSelectedSlot, (state, { slotId }) => ({
    ...state,
    selectedSlot: slotId
  })),

  // SMS Actions (Demo)
  on(DenwaActions.sendSMSDemo, (state) => ({
    ...state,
    isSendingSMS: true,
    error: null
  })),

  on(DenwaActions.sendSMSDemoSuccess, (state, { messageLog }) => ({
    ...state,
    isSendingSMS: false,
    messageLogs: [messageLog, ...state.messageLogs],
    currentView: DenwaView.MESSAGE_LOG,
    error: null
  })),

  on(DenwaActions.sendSMSDemoFailure, (state, { error }) => ({
    ...state,
    isSendingSMS: false,
    error
  })),

  // Filter Actions
  on(DenwaActions.setDateFilter, (state, { startDate, endDate }) => ({
    ...state,
    startDate,
    endDate
  })),

  on(DenwaActions.setNumberFilters, (state, { fromNumber, toNumber }) => ({
    ...state,
    fromNumberFilter: fromNumber,
    toNumberFilter: toNumber
  })),

  // Webhook Actions (Demo)
  on(DenwaActions.openWebhookModal, (state) => ({
    ...state,
    showWebhookModal: true,
    error: null
  })),

  on(DenwaActions.closeWebhookModal, (state) => ({
    ...state,
    showWebhookModal: false
  })),

  on(DenwaActions.createWebhookDemo, (state) => ({
    ...state,
    isCreatingWebhook: true,
    error: null
  })),

  on(DenwaActions.createWebhookDemoSuccess, (state, { successMessage }) => ({
    ...state,
    isCreatingWebhook: false,
    showWebhookModal: false,
    showWebhookSuccessModal: true,
    webhookSuccessMessage: successMessage,
    error: null
  })),

  on(DenwaActions.createWebhookDemoFailure, (state, { error }) => ({
    ...state,
    isCreatingWebhook: false,
    error
  })),

  on(DenwaActions.closeWebhookSuccessModal, (state) => ({
    ...state,
    showWebhookSuccessModal: false,
    webhookSuccessMessage: ''
  })),

  // Reset Actions
  on(DenwaActions.resetDenwaState, () => ({
    ...initialDenwaState
  })),

  on(DenwaActions.clearError, (state) => ({
    ...state,
    error: null
  }))
); 