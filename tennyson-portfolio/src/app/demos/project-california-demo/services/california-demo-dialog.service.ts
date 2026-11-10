import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaliforniaDemoDialogComponent } from '../dialog/california-demo-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CaliforniaDemoDialogService {
  constructor(private dialog: MatDialog) {}

  openCaliforniaDemo(): void {
    this.dialog.open(CaliforniaDemoDialogComponent, {
      width: '95vw',
      height: '95vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'california-demo-dialog',
      disableClose: false,
      hasBackdrop: false
    });
  }
} 