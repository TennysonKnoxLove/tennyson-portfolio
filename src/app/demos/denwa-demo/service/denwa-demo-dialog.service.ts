import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DenwaDemoDialogComponent } from '../dialog/denwa-demo-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DenwaDemoDialogService {

  constructor(private dialog: MatDialog) { }

  openDenwaDemo(): void {
    this.dialog.open(DenwaDemoDialogComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: '1400px',
      maxHeight: '900px',
      panelClass: 'denwa-demo-dialog-panel'
    });
  }
} 