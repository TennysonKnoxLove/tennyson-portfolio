import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversityConnectDialogRefactoredComponent } from '../dialog/university-connect-dialog-refactored.component';
import { UniversityConnectFacade } from '../store/university-connect.facade';

@Injectable({
  providedIn: 'root'
})
export class UniversityConnectDialogService {
  constructor(
    private dialog: MatDialog,
    private facade: UniversityConnectFacade
  ) {}

  /**
   * 🎭 Opens the University Connect demo dialog
   * @returns A reference to the dialog
   */
  openUniversityConnectDemo(): void {
    // Reset state when opening dialog
    this.facade.resetState();
    
    this.dialog.open(UniversityConnectDialogRefactoredComponent, {
      width: '90vw',
      maxWidth: '1200px',
      height: '80vh',
      panelClass: 'university-connect-dialog-panel'
    });
  }
} 