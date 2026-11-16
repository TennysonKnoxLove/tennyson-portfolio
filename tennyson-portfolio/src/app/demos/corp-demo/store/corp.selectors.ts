import { createFeatureSelector, createSelector } from '@ngrx/store';
import { corpState } from './corp.state';
import { WebhookRecord } from '../types/corp-demo.types';

export const selectcorpState = createFeatureSelector<corpState>('corp');

export const selectCurrentView = createSelector(
  selectcorpState,
  (state) => state.currentView
);

export const selectIsFullscreen = createSelector(
  selectcorpState,
  (state) => state.isFullscreen
);

export const selectSelectedBox = createSelector(
  selectcorpState,
  (state) => state.selectedBox
);

export const selectSelectedSlot = createSelector(
  selectcorpState,
  (state) => state.selectedSlot
);

export const selectMessageLogs = createSelector(
  selectcorpState,
  (state) => state.messageLogs
);

export const selectBoxes = createSelector(
  selectcorpState,
  (state) => state.boxes
);

export const selectWebhooks = createSelector(
  selectcorpState,
  (state) => state.webhooks
);

export const selectRelayEmail = createSelector(
  selectcorpState,
  (state) => state.relayEmail
);

export const selectSelectedBoxName = createSelector(
  selectBoxes,
  selectSelectedBox,
  (boxes, boxId) => boxes.find(box => box.id === boxId)?.name ?? ''
);

export const selectSlots = createSelector(
  selectBoxes,
  selectSelectedBox,
  (boxes, boxId) => boxes.find(box => box.id === boxId)?.slots ?? []
);

export const selectPhoneNumbers = createSelector(
  selectSlots,
  selectSelectedSlot,
  (slots, slotId) => slots.find(slot => slot.id === slotId)?.phoneNumbers ?? []
);

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

export const selectFilteredMessageLogs = createSelector(
  selectMessageLogs,
  selectNumberFilters,
  selectDateFilters,
  selectSelectedBox,
  (messageLogs, numberFilters, dateFilters, selectedBox) => {
    let filteredLogs = [...messageLogs];

    if (selectedBox) {
      filteredLogs = filteredLogs.filter(log => log.boxId === selectedBox);
    }

    if (dateFilters.startDate) {
      filteredLogs = filteredLogs.filter(log => log.loggedAt >= dateFilters.startDate);
    }

    if (dateFilters.endDate) {
      filteredLogs = filteredLogs.filter(log => log.loggedAt <= dateFilters.endDate);
    }

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

    return filteredLogs;
  }
);

export const selectShowWebhookModal = createSelector(
  selectcorpState,
  (state) => state.showWebhookModal
);

export const selectShowWebhookSuccessModal = createSelector(
  selectcorpState,
  (state) => state.showWebhookSuccessModal
);

export const selectCreatedWebhook = createSelector(
  selectcorpState,
  (state) => state.createdWebhook
);

export const selectSmsReceipt = createSelector(
  selectcorpState,
  (state) => state.smsReceipt
);

export const selectIsSendingSMS = createSelector(
  selectcorpState,
  (state) => state.isSendingSMS
);

export const selectIsCreatingWebhook = createSelector(
  selectcorpState,
  (state) => state.isCreatingWebhook
);

export const selectLoadError = createSelector(
  selectcorpState,
  (state) => state.loadError
);

export const selectWebhooksError = createSelector(
  selectcorpState,
  (state) => state.webhooksError
);

export const selectError = createSelector(
  selectcorpState,
  (state) => state.error
);

export interface WebhookGroups {
  organization: { regular: WebhookRecord[]; filtered: WebhookRecord[] };
  controller: { regular: WebhookRecord[]; filtered: WebhookRecord[] };
}

export const selectWebhookGroups = createSelector(
  selectWebhooks,
  (webhooks): WebhookGroups => {
    const groups: WebhookGroups = {
      organization: { regular: [], filtered: [] },
      controller: { regular: [], filtered: [] }
    };

    for (const webhook of webhooks) {
      const levelBucket = webhook.level === 'organization' ? groups.organization : groups.controller;
      if (webhook.type === 'filtered') {
        levelBucket.filtered.push(webhook);
      } else {
        levelBucket.regular.push(webhook);
      }
    }

    return groups;
  }
);

const selectViewShell = createSelector(
  selectCurrentView,
  selectIsFullscreen,
  selectSelectedBox,
  selectSelectedBoxName,
  selectSelectedSlot,
  selectSlots,
  selectPhoneNumbers,
  selectRelayEmail,
  (currentView, isFullscreen, selectedBox, selectedBoxName, selectedSlot, slots, phoneNumbers, relayEmail) => ({
    currentView,
    isFullscreen,
    selectedBox,
    selectedBoxName,
    selectedSlot,
    slots,
    phoneNumbers,
    relayEmail
  })
);

const selectWebhookUi = createSelector(
  selectShowWebhookModal,
  selectShowWebhookSuccessModal,
  selectCreatedWebhook,
  selectWebhookGroups,
  selectWebhooksError,
  (showWebhookModal, showWebhookSuccessModal, createdWebhook, webhookGroups, webhooksError) => ({
    showWebhookModal,
    showWebhookSuccessModal,
    createdWebhook,
    webhookGroups,
    webhooksError
  })
);

const selectSmsUi = createSelector(
  selectSmsReceipt,
  selectLoadError,
  (smsReceipt, loadError) => ({
    smsReceipt,
    loadError
  })
);

export const selectcorpViewModel = createSelector(
  selectViewShell,
  selectDateFilters,
  selectNumberFilters,
  selectWebhookUi,
  selectSmsUi,
  (shell, dateFilters, numberFilters, webhookUi, smsUi) => ({
    ...shell,
    ...webhookUi,
    ...smsUi,
    startDate: dateFilters.startDate,
    endDate: dateFilters.endDate,
    fromNumberFilter: numberFilters.fromNumber,
    toNumberFilter: numberFilters.toNumber
  })
);
