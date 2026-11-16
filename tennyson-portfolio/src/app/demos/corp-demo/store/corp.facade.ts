import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as corpActions from './corp.actions';
import * as corpSelectors from './corp.selectors';
import { corpView, MessageLog, BoxConfig, SmsReceipt } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from './corp.state';

@Injectable({
  providedIn: 'root'
})
export class corpFacadeService {

  constructor(private store: Store) {}

  get viewModel$(): Observable<any> {
    return this.store.select(corpSelectors.selectcorpViewModel);
  }

  get filteredMessageLogs$(): Observable<MessageLog[]> {
    return this.store.select(corpSelectors.selectFilteredMessageLogs);
  }

  get boxes$(): Observable<BoxConfig[]> {
    return this.store.select(corpSelectors.selectBoxes);
  }

  get smsReceipt$(): Observable<SmsReceipt | null> {
    return this.store.select(corpSelectors.selectSmsReceipt);
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

  get errorAlert$(): Observable<string> {
    return this.error$.pipe(
      filter(error => !!error),
      map(error => error!)
    );
  }

  loadDemoData(): void {
    this.store.dispatch(corpActions.loadBoxes());
    this.store.dispatch(corpActions.loadMessageLogs());
    this.store.dispatch(corpActions.loadWebhooks());
  }

  switchView(view: corpView): void {
    this.store.dispatch(corpActions.switchView({ view }));
  }

  toggleFullscreen(): void {
    this.store.dispatch(corpActions.toggleFullscreen());
  }

  setSelectedBox(boxId: string): void {
    this.store.dispatch(corpActions.setSelectedBox({ boxId }));
  }

  setSelectedSlot(slotId: string): void {
    this.store.dispatch(corpActions.setSelectedSlot({ slotId }));
  }

  sendSms(smsForm: SMSForm, selectedBox: string, selectedSlot: string): void {
    if (!selectedBox || !selectedSlot) {
      this.store.dispatch(corpActions.sendSmsFailure({
        error: 'Select a box and a slot before sending.'
      }));
      return;
    }

    if (!smsForm.phoneNumber || !smsForm.toNumber.trim() || !smsForm.message.trim()) {
      this.store.dispatch(corpActions.sendSmsFailure({
        error: 'Choose a from number, enter a recipient, and write a message.'
      }));
      return;
    }

    this.store.dispatch(corpActions.sendSms({
      smsForm,
      boxId: selectedBox,
      slotId: selectedSlot
    }));
  }

  clearSmsReceipt(): void {
    this.store.dispatch(corpActions.clearSmsReceipt());
  }

  createClearedSMSForm(currentForm: SMSForm): SMSForm {
    return {
      phoneNumber: currentForm.phoneNumber,
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

  setDateFilter(startDate: string, endDate: string): void {
    this.store.dispatch(corpActions.setDateFilter({ startDate, endDate }));
  }

  setNumberFilters(fromNumber: string, toNumber: string): void {
    this.store.dispatch(corpActions.setNumberFilters({ fromNumber, toNumber }));
  }

  openWebhookModal(): void {
    this.store.dispatch(corpActions.openWebhookModal());
  }

  closeWebhookModal(): void {
    this.store.dispatch(corpActions.closeWebhookModal());
  }

  createWebhook(webhookForm: WebhookForm): void {
    this.store.dispatch(corpActions.createWebhook({ webhookForm }));
  }

  closeWebhookSuccessModal(): void {
    this.store.dispatch(corpActions.closeWebhookSuccessModal());
  }

  clearError(): void {
    this.store.dispatch(corpActions.clearError());
  }

  resetState(): void {
    this.store.dispatch(corpActions.resetcorpState());
  }

  getDefaultWebhookForm(): WebhookForm {
    return {
      url: '',
      level: 'controller',
      type: 'regular',
      format: 'discord',
      controller: 'corp-01-max-z'
    };
  }

  handleError(error: string): void {
    alert(error);
    this.clearError();
  }
}
