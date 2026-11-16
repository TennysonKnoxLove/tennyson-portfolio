import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversityConnectDialogRefactoredComponent } from '../dialog/university-connect-dialog-refactored.component';
import { UniversityConnectNavService } from './university-connect-nav.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityConnectDialogService {
  constructor(
    private dialog: MatDialog,
    private nav: UniversityConnectNavService
  ) {}

  /**
   * Opens the University Connect demo in a dialog, same pattern as the other project demos.
   */
  openUniversityConnectDemo(): void {
    this.nav.goHome();

    this.dialog.open(UniversityConnectDialogRefactoredComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: '1400px',
      maxHeight: '900px',
      panelClass: 'university-connect-dialog-panel',
      autoFocus: false
    });
  }
} 