import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as DenwaActions from './denwa.actions';
import * as DenwaSelectors from './denwa.selectors';
import { DenwaView, MessageLog, BoxConfig } from '../types/denwa-demo.types';
import { SMSForm, WebhookForm } from './denwa.state';

@Injectable({
  providedIn: 'root'
})
export class DenwaFacadeService {

  constructor(private store: Store) {}

  // Selectors - Expose observables for components
  get viewModel$(): Observable<any> {
    return this.store.select(DenwaSelectors.selectDenwaViewModel);
  }

  get filteredMessageLogs$(): Observable<MessageLog[]> {
    return this.store.select(DenwaSelectors.selectFilteredMessageLogs);
  }

  get boxes$(): Observable<BoxConfig[]> {
    return this.store.select(DenwaSelectors.selectBoxes);
  }

  get error$(): Observable<string | null> {
    return this.store.select(DenwaSelectors.selectError);
  }

  get isSendingSMS$(): Observable<boolean> {
    return this.store.select(DenwaSelectors.selectIsSendingSMS);
  }

  get isCreatingWebhook$(): Observable<boolean> {
    return this.store.select(DenwaSelectors.selectIsCreatingWebhook);
  }

  // Error handling for components
  get errorAlert$(): Observable<string> {
    return this.error$.pipe(
      filter(error => !!error),
      map(error => error!)
    );
  }

  // View Management
  switchView(view: DenwaView): void {
    this.store.dispatch(DenwaActions.switchView({ view }));
  }

  toggleFullscreen(): void {
    this.store.dispatch(DenwaActions.toggleFullscreen());
  }

  // Selection Management
  setSelectedBox(boxId: string): void {
    this.store.dispatch(DenwaActions.setSelectedBox({ boxId }));
  }

  setSelectedSlot(slotId: string): void {
    this.store.dispatch(DenwaActions.setSelectedSlot({ slotId }));
  }

  // SMS Operations (Demo)
  sendSMSDemo(smsForm: SMSForm, selectedBox: string): void {
    // Validate box selection before dispatching
    if (!selectedBox) {
      this.store.dispatch(DenwaActions.sendSMSDemoFailure({ 
        error: '📱 Demo: Please select a box from the sidebar first' 
      }));
      return;
    }

    this.store.dispatch(DenwaActions.sendSMSDemo({ smsForm }));
  }

  // Form Management - Business logic for forms
  createClearedSMSForm(currentForm: SMSForm): SMSForm {
    return {
      phoneNumber: currentForm.phoneNumber, // Keep phone number
      toNumber: '',
      message: ''
    };
  }

  calculateCharacterCount(message: string): number {
    return message.length;
  }

  getMaxCharacters(): number {
    return 160;
  }

  // Filter Operations
  setDateFilter(startDate: string, endDate: string): void {
    this.store.dispatch(DenwaActions.setDateFilter({ startDate, endDate }));
  }

  setNumberFilters(fromNumber: string, toNumber: string): void {
    this.store.dispatch(DenwaActions.setNumberFilters({ fromNumber, toNumber }));
  }

  // Webhook Operations (Demo)
  openWebhookModal(): void {
    this.store.dispatch(DenwaActions.openWebhookModal());
  }

  closeWebhookModal(): void {
    this.store.dispatch(DenwaActions.closeWebhookModal());
  }

  createWebhookDemo(webhookForm: WebhookForm): void {
    this.store.dispatch(DenwaActions.createWebhookDemo({ webhookForm }));
  }

  closeWebhookSuccessModal(): void {
    this.store.dispatch(DenwaActions.closeWebhookSuccessModal());
  }

  // Export Operations (Demo)
  exportToCSVDemo(): void {
    this.store.dispatch(DenwaActions.exportToCSVDemo());
  }

  // Utility Operations
  clearError(): void {
    this.store.dispatch(DenwaActions.clearError());
  }

  resetState(): void {
    this.store.dispatch(DenwaActions.resetDenwaState());
  }

  // Helper methods for component convenience
  getDefaultWebhookForm(): WebhookForm {
    return {
      url: '',
      level: 'controller',
      type: 'regular',
      format: 'discord',
      controller: 'denwa-test-ARIA-Test-310'
    };
  }

  // Error handling helper
  handleError(error: string): void {
    alert(error);
    this.clearError();
  }
} 