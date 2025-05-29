import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-csv-export-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="csv-export-dialog">
      <div class="dialog-header">
        <div class="icon-container">
          <mat-icon class="export-icon">file_download</mat-icon>
        </div>
        <h2>📊 CSV Export Demo</h2>
      </div>
      
      <div class="dialog-content">
        <p class="main-message">
          <strong>Export functionality demonstrated!</strong>
        </p>
        <p class="sub-message">
          In a real implementation, this would trigger a CSV file download containing all the message log data with the currently applied filters.
        </p>
        
        <div class="feature-list">
          <div class="feature-item">
            <mat-icon>check_circle</mat-icon>
            <span>Export filtered message logs</span>
          </div>
          <div class="feature-item">
            <mat-icon>check_circle</mat-icon>
            <span>Include timestamp, from, to, modem ID, and message</span>
          </div>
          <div class="feature-item">
            <mat-icon>check_circle</mat-icon>
            <span>Respect date and number filters</span>
          </div>
        </div>
        
        <div class="demo-note">
          <mat-icon>info</mat-icon>
          <span>This is a UI demonstration - no actual file will be downloaded</span>
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
      align-items: center;
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
    }

    .feature-item span {
      color: #555;
      font-size: 14px;
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
export class CsvExportDialogComponent {
  constructor(private dialogRef: MatDialogRef<CsvExportDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
} 