import { createFeatureSelector, createSelector } from '@ngrx/store';
import { corpState } from './corp.state';

// Feature selector
export const selectcorpState = createFeatureSelector<corpState>('corp');

// View selectors
export const selectCurrentView = createSelector(
  selectcorpState,
  (state) => state.currentView
);

export const selectIsFullscreen = createSelector(
  selectcorpState,
  (state) => state.isFullscreen
);

// Selection selectors
export const selectSelectedBox = createSelector(
  selectcorpState,
  (state) => state.selectedBox
);

export const selectSelectedSlot = createSelector(
  selectcorpState,
  (state) => state.selectedSlot
);

// Data selectors
export const selectMessageLogs = createSelector(
  selectcorpState,
  (state) => state.messageLogs
);

export const selectBoxes = createSelector(
  selectcorpState,
  (state) => state.boxes
);

export const selectRelayEmail = createSelector(
  selectcorpState,
  (state) => state.relayEmail
);

// Filter selectors
export const selectDateFilters = createSelector(
  selectcorpState,
  (state) => ({
    startDate: state.startDate,
    endDate: state.endDate
  })
);

export const selectNumberFilters = createSelector(
  selectcorpState,
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
  selectcorpState,
  (state) => state.showWebhookModal
);

export const selectShowWebhookSuccessModal = createSelector(
  selectcorpState,
  (state) => state.showWebhookSuccessModal
);

export const selectWebhookSuccessMessage = createSelector(
  selectcorpState,
  (state) => state.webhookSuccessMessage
);

// Loading selectors
export const selectIsLoading = createSelector(
  selectcorpState,
  (state) => state.isLoading
);

export const selectIsSendingSMS = createSelector(
  selectcorpState,
  (state) => state.isSendingSMS
);

export const selectIsCreatingWebhook = createSelector(
  selectcorpState,
  (state) => state.isCreatingWebhook
);

// Error selector
export const selectError = createSelector(
  selectcorpState,
  (state) => state.error
);

// Combined selectors for component convenience
export const selectcorpViewModel = createSelector(
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