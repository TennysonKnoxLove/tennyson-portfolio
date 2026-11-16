import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SmsReceipt } from '../types/corp-demo.types';

@Component({
  selector: 'app-sms-demo-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="csv-export-dialog">
      <div class="dialog-header">
        <div class="icon-container">
          <mat-icon class="export-icon">sms</mat-icon>
        </div>
        <h2>SMS Send Demo</h2>
      </div>

      <div class="dialog-content">
        <p class="main-message">
          <strong>This would have sent an SMS.</strong>
        </p>
        <p class="sub-message">
          In a real implementation, {{ data.boxName }} / {{ data.slotName }} would deliver the message below from {{ data.from }} to {{ data.to }}.
        </p>

        <div class="feature-list">
          <div class="feature-item">
            <mat-icon>phone</mat-icon>
            <span>From: {{ data.from }}</span>
          </div>
          <div class="feature-item">
            <mat-icon>call_made</mat-icon>
            <span>To: {{ data.to }}</span>
          </div>
          <div class="feature-item">
            <mat-icon>inbox</mat-icon>
            <span>{{ data.boxName }} · {{ data.slotName }}</span>
          </div>
          <div class="feature-item">
            <mat-icon>chat</mat-icon>
            <span>{{ data.message }}</span>
          </div>
        </div>

        <div class="demo-note">
          <mat-icon>info</mat-icon>
          <span>This is a UI demonstration - no actual SMS will be sent</span>
        </div>
      </div>

      <div class="dialog-actions">
        <button mat-raised-button color="primary" (click)="closeDialog()" class="ok-button">
          <mat-icon>check</mat-icon>
          Got it!
        </button>
      </div>
    </div>
  `,
  styles: [`
    .csv-export-dialog {
      padding: 0;
      max-width: 500px;
      border-radius: 12px;
      overflow: hidden;
    }

    .dialog-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      text-align: center;
      position: relative;
    }

    .icon-container {
      margin-bottom: 12px;
    }

    .export-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      padding: 12px;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }

    .dialog-content {
      padding: 32px 24px 24px 24px;
    }

    .main-message {
      font-size: 18px;
      color: #333;
      margin: 0 0 12px 0;
      text-align: center;
    }

    .sub-message {
      color: #666;
      line-height: 1.5;
      margin: 0 0 24px 0;
      text-align: center;
    }

    .feature-list {
      margin: 24px 0;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      margin: 12px 0;
      padding: 8px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }

    .feature-item mat-icon {
      color: #4caf50;
      margin-right: 12px;
      font-size: 20px;
      height: 20px;
      width: 20px;
      flex-shrink: 0;
    }

    .feature-item span {
      color: #555;
      font-size: 14px;
      word-break: break-word;
    }

    .demo-note {
      display: flex;
      align-items: center;
      padding: 16px;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      margin-top: 24px;
    }

    .demo-note mat-icon {
      color: #856404;
      margin-right: 12px;
      font-size: 20px;
      height: 20px;
      width: 20px;
      flex-shrink: 0;
    }

    .demo-note span {
      color: #856404;
      font-size: 14px;
      font-style: italic;
    }

    .dialog-actions {
      padding: 24px;
      text-align: center;
      background: #f8f9fa;
      border-top: 1px solid #e9ecef;
    }

    .ok-button {
      min-width: 120px;
      height: 44px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 22px;
    }

    .ok-button mat-icon {
      margin-right: 8px;
    }
  `]
})
export class SmsDemoDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SmsDemoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SmsReceipt
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
