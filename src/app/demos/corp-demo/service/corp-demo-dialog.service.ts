import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { corpDemoDialogComponent } from '../dialog/corp-demo-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class corpDemoDialogService {

  constructor(private dialog: MatDialog) { }

  opencorpDemo(): void {
    this.dialog.open(corpDemoDialogComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: '1400px',
      maxHeight: '900px',
      panelClass: 'corp-demo-dialog-panel'
    });
  }
} 