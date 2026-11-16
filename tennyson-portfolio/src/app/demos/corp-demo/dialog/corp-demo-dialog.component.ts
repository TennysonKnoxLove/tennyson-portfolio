import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { MessageLog, BoxConfig, SmsReceipt, corpView } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from '../store/corp.state';
import { corpFacadeService } from '../store/corp.facade';
import { CsvExportDialogComponent } from './csv-export-dialog.component';
import { SmsDemoDialogComponent } from './sms-demo-dialog.component';

@Component({
  selector: 'app-corp-demo-dialog',
  templateUrl: './corp-demo-dialog.component.html',
  styleUrls: ['./corp-demo-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class corpDemoDialogComponent implements OnInit, OnDestroy {
  corpView = corpView;
  
  // Form data - UI state only
  smsForm: SMSForm = {
    phoneNumber: '',
    toNumber: '',
    message: ''
  };
  
  webhookForm: WebhookForm;
  
  // UI-only properties
  maxCharacters: number;
  
  // Local filter values for template binding
  currentStartDate: string = '';
  currentEndDate: string = '';
  currentFromNumber: string = '';
  currentToNumber: string = '';
  
  private destroy$ = new Subject<void>();
  private webhookSuccessWasOpen = false;

  constructor(
    public dialogRef: MatDialogRef<corpDemoDialogComponent>,
    private corpFacade: corpFacadeService,
    private dialog: MatDialog
  ) {
    this.maxCharacters = this.corpFacade.getMaxCharacters();
    this.webhookForm = this.corpFacade.getDefaultWebhookForm();
  }

  // Observable state from facade (as getters to avoid initialization issues)
  get viewModel$(): Observable<any> {
    return this.corpFacade.viewModel$;
  }

  get filteredMessageLogs$(): Observable<MessageLog[]> {
    return this.corpFacade.filteredMessageLogs$;
  }

  get boxes$(): Observable<BoxConfig[]> {
    return this.corpFacade.boxes$;
  }

  get isSendingSMS$(): Observable<boolean> {
    return this.corpFacade.isSendingSMS$;
  }

  get isCreatingWebhook$(): Observable<boolean> {
    return this.corpFacade.isCreatingWebhook$;
  }

  // Character count as computed property
  get characterCount(): number {
    return this.corpFacade.calculateCharacterCount(this.smsForm.message);
  }

  ngOnInit(): void {
    // Subscribe to errors and handle them via facade
    this.corpFacade.errorAlert$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      this.corpFacade.handleError(error);
    });

    // Subscribe to filter changes to keep local values in sync
    this.corpFacade.loadDemoData();

    this.viewModel$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(vm => {
      if (vm) {
        this.currentStartDate = vm.startDate || '';
        this.currentEndDate = vm.endDate || '';
        this.currentFromNumber = vm.fromNumberFilter || '';
        this.currentToNumber = vm.toNumberFilter || '';
        if (vm.showWebhookSuccessModal && !this.webhookSuccessWasOpen) {
          this.webhookForm = this.corpFacade.getDefaultWebhookForm();
        }
        this.webhookSuccessWasOpen = !!vm.showWebhookSuccessModal;
      }
    });

    this.corpFacade.smsReceipt$.pipe(
      filter((receipt): receipt is SmsReceipt => !!receipt),
      takeUntil(this.destroy$)
    ).subscribe(receipt => {
      this.smsForm = this.corpFacade.createClearedSMSForm(this.smsForm);
      this.corpFacade.clearSmsReceipt();
      this.dialog.open(SmsDemoDialogComponent, {
        width: '500px',
        maxWidth: '90vw',
        data: receipt
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.corpFacade.resetState();
  }

  // Dialog controls - UI only
  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleFullscreen(): void {
    this.corpFacade.toggleFullscreen();
  }

  // View management - delegate to facade
  switchView(view: corpView): void {
    this.corpFacade.switchView(view);
  }

  // Selection - delegate to facade
  onBoxSelectionChange(boxId: string): void {
    this.corpFacade.setSelectedBox(boxId);
    this.smsForm.phoneNumber = '';
  }

  onSlotSelectionChange(slotId: string): void {
    this.corpFacade.setSelectedSlot(slotId);
    this.smsForm.phoneNumber = '';
  }

  fromNumberSelections(vm: { selectedBox?: string; selectedSlot?: string; phoneNumbers?: string[] } | null): { key: string; phoneNumbers: string[] }[] {
    if (!vm?.selectedBox || !vm?.selectedSlot) {
      return [];
    }

    return [{
      key: `${vm.selectedBox}:${vm.selectedSlot}`,
      phoneNumbers: vm.phoneNumbers ?? []
    }];
  }

  trackFromNumberSelection(_index: number, selection: { key: string }): string {
    return selection.key;
  }

  canSendSms(vm: { selectedBox?: string; selectedSlot?: string } | null): boolean {
    return !!vm?.selectedBox
      && !!vm?.selectedSlot
      && !!this.smsForm.phoneNumber
      && !!this.smsForm.toNumber.trim()
      && !!this.smsForm.message.trim();
  }

  sendSMS(): void {
    this.viewModel$.pipe(take(1)).subscribe(vm => {
      this.corpFacade.sendSms(this.smsForm, vm?.selectedBox ?? '', vm?.selectedSlot ?? '');
    });
  }

  exportToCSV(): void {
    this.dialog.open(CsvExportDialogComponent, {
      width: '500px',
      maxWidth: '90vw'
    });
  }

  // Filter operations - now using local values with helper methods
  onStartDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentStartDate = value;
    this.corpFacade.setDateFilter(value, this.currentEndDate);
  }

  onEndDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentEndDate = value;
    this.corpFacade.setDateFilter(this.currentStartDate, value);
  }

  onFromNumberChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentFromNumber = value;
    this.corpFacade.setNumberFilters(value, this.currentToNumber);
  }

  onToNumberChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentToNumber = value;
    this.corpFacade.setNumberFilters(this.currentFromNumber, value);
  }

  // Webhook operations - delegate to facade
  openWebhookModal(): void {
    this.corpFacade.openWebhookModal();
  }

  closeWebhookModal(): void {
    this.corpFacade.closeWebhookModal();
    // Reset form using facade logic
    this.webhookForm = this.corpFacade.getDefaultWebhookForm();
  }

  createWebhook(): void {
    this.corpFacade.createWebhook(this.webhookForm);
  }

  closeWebhookSuccessModal(): void {
    this.corpFacade.closeWebhookSuccessModal();
  }
} 