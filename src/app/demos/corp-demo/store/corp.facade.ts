import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as corpActions from './corp.actions';
import * as corpSelectors from './corp.selectors';
import { corpView, MessageLog, BoxConfig } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from './corp.state';

@Injectable({
  providedIn: 'root'
})
export class corpFacadeService {

  constructor(private store: Store) {}

  // Selectors - Expose observables for components
  get viewModel$(): Observable<any> {
    return this.store.select(corpSelectors.selectcorpViewModel);
  }

  get filteredMessageLogs$(): Observable<MessageLog[]> {
    return this.store.select(corpSelectors.selectFilteredMessageLogs);
  }

  get boxes$(): Observable<BoxConfig[]> {
    return this.store.select(corpSelectors.selectBoxes);
  }

  get error$(): Observable<string | null> {
    return this.store.select(corpSelectors.selectError);
  }

  get isSendingSMS$(): Observable<boolean> {
    return this.store.select(corpSelectors.selectIsSendingSMS);
  }

  get isCreatingWebhook$(): Observable<boolean> {
    return this.store.select(corpSelectors.selectIsCreatingWebhook);
  }

  // Error handling for components
  get errorAlert$(): Observable<string> {
    return this.error$.pipe(
      filter(error => !!error),
      map(error => error!)
    );
  }

  // View Management
  switchView(view: corpView): void {
    this.store.dispatch(corpActions.switchView({ view }));
  }

  toggleFullscreen(): void {
    this.store.dispatch(corpActions.toggleFullscreen());
  }

  // Selection Management
  setSelectedBox(boxId: string): void {
    this.store.dispatch(corpActions.setSelectedBox({ boxId }));
  }

  setSelectedSlot(slotId: string): void {
    this.store.dispatch(corpActions.setSelectedSlot({ slotId }));
  }

  // SMS Operations (Demo)
  sendSMSDemo(smsForm: SMSForm, selectedBox: string): void {
    // Validate box selection before dispatching
    if (!selectedBox) {
      this.store.dispatch(corpActions.sendSMSDemoFailure({ 
        error: '📱 Demo: Please select a box from the sidebar first' 
      }));
      return;
    }

    this.store.dispatch(corpActions.sendSMSDemo({ smsForm }));
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
    this.store.dispatch(corpActions.setDateFilter({ startDate, endDate }));
  }

  setNumberFilters(fromNumber: string, toNumber: string): void {
    this.store.dispatch(corpActions.setNumberFilters({ fromNumber, toNumber }));
  }

  // Webhook Operations (Demo)
  openWebhookModal(): void {
    this.store.dispatch(corpActions.openWebhookModal());
  }

  closeWebhookModal(): void {
    this.store.dispatch(corpActions.closeWebhookModal());
  }

  createWebhookDemo(webhookForm: WebhookForm): void {
    this.store.dispatch(corpActions.createWebhookDemo({ webhookForm }));
  }

  closeWebhookSuccessModal(): void {
    this.store.dispatch(corpActions.closeWebhookSuccessModal());
  }

  // Export Operations (Demo)
  exportToCSVDemo(): void {
    this.store.dispatch(corpActions.exportToCSVDemo());
  }

  // Utility Operations
  clearError(): void {
    this.store.dispatch(corpActions.clearError());
  }

  resetState(): void {
    this.store.dispatch(corpActions.resetcorpState());
  }

  // Helper methods for component convenience
  getDefaultWebhookForm(): WebhookForm {
    return {
      url: '',
      level: 'controller',
      type: 'regular',
      format: 'discord',
      controller: 'corp-test-ARIA-Test-310'
    };
  }

  // Error handling helper
  handleError(error: string): void {
    alert(error);
    this.clearError();
  }
} 