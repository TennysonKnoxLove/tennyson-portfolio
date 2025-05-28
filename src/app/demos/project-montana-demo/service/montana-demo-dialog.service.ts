import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MontanaDemoDialogComponent } from '../dialog/montana-demo-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MontanaDemoDialogService {
  constructor(private dialog: MatDialog) {}

  openMontanaDemo(): void {
    this.dialog.open(MontanaDemoDialogComponent, {
      width: '95vw',
      height: '95vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'montana-demo-dialog',
      disableClose: false,
      hasBackdrop: false
    });
  }
} 