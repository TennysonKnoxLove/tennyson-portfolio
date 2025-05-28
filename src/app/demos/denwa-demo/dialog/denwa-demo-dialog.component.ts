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
import { MessageLog, BoxConfig, DenwaView } from '../types/denwa-demo.types';
import { SMSForm, WebhookForm } from '../store/denwa.state';
import { DenwaFacadeService } from '../store/denwa.facade';
import { CsvExportDialogComponent } from './csv-export-dialog.component';

@Component({
  selector: 'app-denwa-demo-dialog',
  templateUrl: './denwa-demo-dialog.component.html',
  styleUrls: ['./denwa-demo-dialog.component.scss'],
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
export class DenwaDemoDialogComponent implements OnInit, OnDestroy {
  DenwaView = DenwaView;
  
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
    public dialogRef: MatDialogRef<DenwaDemoDialogComponent>,
    private denwaFacade: DenwaFacadeService,
    private dialog: MatDialog
  ) {
    this.maxCharacters = this.denwaFacade.getMaxCharacters();
    this.webhookForm = this.denwaFacade.getDefaultWebhookForm();
  }

  // Observable state from facade (as getters to avoid initialization issues)
  get viewModel$(): Observable<any> {
    return this.denwaFacade.viewModel$;
  }

  get filteredMessageLogs$(): Observable<MessageLog[]> {
    return this.denwaFacade.filteredMessageLogs$;
  }

  get boxes$(): Observable<BoxConfig[]> {
    return this.denwaFacade.boxes$;
  }

  get isSendingSMS$(): Observable<boolean> {
    return this.denwaFacade.isSendingSMS$;
  }

  get isCreatingWebhook$(): Observable<boolean> {
    return this.denwaFacade.isCreatingWebhook$;
  }

  // Character count as computed property
  get characterCount(): number {
    return this.denwaFacade.calculateCharacterCount(this.smsForm.message);
  }

  ngOnInit(): void {
    // Subscribe to errors and handle them via facade
    this.denwaFacade.errorAlert$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(error => {
      this.denwaFacade.handleError(error);
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
    this.denwaFacade.resetState();
  }

  // Dialog controls - UI only
  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleFullscreen(): void {
    this.denwaFacade.toggleFullscreen();
  }

  // View management - delegate to facade
  switchView(view: DenwaView): void {
    this.denwaFacade.switchView(view);
  }

  // Selection - delegate to facade
  onBoxSelectionChange(boxId: string): void {
    this.denwaFacade.setSelectedBox(boxId);
  }

  onSlotSelectionChange(slotId: string): void {
    this.denwaFacade.setSelectedSlot(slotId);
  }

  // SMS operations - delegate to facade
  sendSMS(): void {
    // Get selected box from current state
    this.viewModel$.pipe(takeUntil(this.destroy$)).subscribe(vm => {
      this.denwaFacade.sendSMSDemo(this.smsForm, vm.selectedBox);
      // Clear form using facade logic
      this.smsForm = this.denwaFacade.createClearedSMSForm(this.smsForm);
    }).unsubscribe();
  }

  // Export - delegate to facade
  exportToCSV(): void {
    this.denwaFacade.exportToCSVDemo();
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
    this.denwaFacade.setDateFilter(value, this.currentEndDate);
  }

  onEndDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentEndDate = value;
    this.denwaFacade.setDateFilter(this.currentStartDate, value);
  }

  onFromNumberChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentFromNumber = value;
    this.denwaFacade.setNumberFilters(value, this.currentToNumber);
  }

  onToNumberChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.currentToNumber = value;
    this.denwaFacade.setNumberFilters(this.currentFromNumber, value);
  }

  // Webhook operations - delegate to facade
  openWebhookModal(): void {
    this.denwaFacade.openWebhookModal();
  }

  closeWebhookModal(): void {
    this.denwaFacade.closeWebhookModal();
    // Reset form using facade logic
    this.webhookForm = this.denwaFacade.getDefaultWebhookForm();
  }

  createWebhook(): void {
    this.denwaFacade.createWebhookDemo(this.webhookForm);
    // Reset form using facade logic
    this.webhookForm = this.denwaFacade.getDefaultWebhookForm();
  }

  closeWebhookSuccessModal(): void {
    this.denwaFacade.closeWebhookSuccessModal();
  }
} 