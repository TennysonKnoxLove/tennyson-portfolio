import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DenwaState } from './denwa.state';

// Feature selector
export const selectDenwaState = createFeatureSelector<DenwaState>('denwa');

// View selectors
export const selectCurrentView = createSelector(
  selectDenwaState,
  (state) => state.currentView
);

export const selectIsFullscreen = createSelector(
  selectDenwaState,
  (state) => state.isFullscreen
);

// Selection selectors
export const selectSelectedBox = createSelector(
  selectDenwaState,
  (state) => state.selectedBox
);

export const selectSelectedSlot = createSelector(
  selectDenwaState,
  (state) => state.selectedSlot
);

// Data selectors
export const selectMessageLogs = createSelector(
  selectDenwaState,
  (state) => state.messageLogs
);

export const selectBoxes = createSelector(
  selectDenwaState,
  (state) => state.boxes
);

export const selectRelayEmail = createSelector(
  selectDenwaState,
  (state) => state.relayEmail
);

// Filter selectors
export const selectDateFilters = createSelector(
  selectDenwaState,
  (state) => ({
    startDate: state.startDate,
    endDate: state.endDate
  })
);

export const selectNumberFilters = createSelector(
  selectDenwaState,
  (state) => ({
    fromNumber: state.fromNumberFilter,
    toNumber: state.toNumberFilter
  })
);

// Filtered message logs selector
export const selectFilteredMessageLogs = createSelector(
  selectMessageLogs,
  selectNumberFilters,
  selectDateFilters,
  (messageLogs, numberFilters, dateFilters) => {
    let filteredLogs = [...messageLogs];

    // Apply number filters
    if (numberFilters.fromNumber) {
      filteredLogs = filteredLogs.filter(log => 
        log.from.includes(numberFilters.fromNumber)
      );
    }

    if (numberFilters.toNumber) {
      filteredLogs = filteredLogs.filter(log => 
        log.to.includes(numberFilters.toNumber)
      );
    }

    // Date filtering would be implemented here if needed
    if (dateFilters.startDate || dateFilters.endDate) {
      // Implementation for date filtering
    }

    return filteredLogs;
  }
);

// Modal selectors
export const selectShowWebhookModal = createSelector(
  selectDenwaState,
  (state) => state.showWebhookModal
);

export const selectShowWebhookSuccessModal = createSelector(
  selectDenwaState,
  (state) => state.showWebhookSuccessModal
);

export const selectWebhookSuccessMessage = createSelector(
  selectDenwaState,
  (state) => state.webhookSuccessMessage
);

// Loading selectors
export const selectIsLoading = createSelector(
  selectDenwaState,
  (state) => state.isLoading
);

export const selectIsSendingSMS = createSelector(
  selectDenwaState,
  (state) => state.isSendingSMS
);

export const selectIsCreatingWebhook = createSelector(
  selectDenwaState,
  (state) => state.isCreatingWebhook
);

// Error selector
export const selectError = createSelector(
  selectDenwaState,
  (state) => state.error
);

// Combined selectors for component convenience
export const selectDenwaViewModel = createSelector(
  selectCurrentView,
  selectIsFullscreen,
  selectSelectedBox,
  selectSelectedSlot,
  selectRelayEmail,
  selectShowWebhookModal,
  selectShowWebhookSuccessModal,
  selectWebhookSuccessMessage,
  selectDateFilters,
  selectNumberFilters,
  selectIsSendingSMS,
  selectIsCreatingWebhook,
  selectError,
  (
    currentView,
    isFullscreen,
    selectedBox,
    selectedSlot,
    relayEmail,
    showWebhookModal,
    showWebhookSuccessModal,
    webhookSuccessMessage,
    dateFilters,
    numberFilters,
    isSendingSMS,
    isCreatingWebhook,
    error
  ) => ({
    currentView,
    isFullscreen,
    selectedBox,
    selectedSlot,
    relayEmail,
    showWebhookModal,
    showWebhookSuccessModal,
    webhookSuccessMessage,
    startDate: dateFilters.startDate,
    endDate: dateFilters.endDate,
    fromNumberFilter: numberFilters.fromNumber,
    toNumberFilter: numberFilters.toNumber,
    isSendingSMS,
    isCreatingWebhook,
    error
  })
); 