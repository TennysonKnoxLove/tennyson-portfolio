import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageLog, BoxConfig, corpView } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from '../store/corp.state';
import { corpFacadeService } from '../store/corp.facade';
import { CsvExportDialogComponent } from './csv-export-dialog.component';

@Component({
  selector: 'app-corp-demo-dialog',
  templateUrl: './corp-demo-dialog.component.html',
  styleUrls: ['./corp-demo-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
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
    this.viewModel$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(vm => {
      if (vm) {
        this.currentStartDate = vm.startDate || '';
        this.currentEndDate = vm.endDate || '';
        this.currentFromNumber = vm.fromNumberFilter || '';
        this.currentToNumber = vm.toNumberFilter || '';
      }
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
  }

  onSlotSelectionChange(slotId: string): void {
    this.corpFacade.setSelectedSlot(slotId);
  }

  // SMS operations - delegate to facade
  sendSMS(): void {
    // Get selected box from current state
    this.viewModel$.pipe(takeUntil(this.destroy$)).subscribe(vm => {
      this.corpFacade.sendSMSDemo(this.smsForm, vm.selectedBox);
      // Clear form using facade logic
      this.smsForm = this.corpFacade.createClearedSMSForm(this.smsForm);
    }).unsubscribe();
  }

  // Export - delegate to facade
  exportToCSV(): void {
    this.corpFacade.exportToCSVDemo();
    // Open styled dialog instead of alert
    this.dialog.open(CsvExportDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      panelClass: 'csv-export-dialog-panel'
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
    this.corpFacade.createWebhookDemo(this.webhookForm);
    // Reset form using facade logic
    this.webhookForm = this.corpFacade.getDefaultWebhookForm();
  }

  closeWebhookSuccessModal(): void {
    this.corpFacade.closeWebhookSuccessModal();
  }
} 