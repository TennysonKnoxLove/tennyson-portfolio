import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UniversityConnectHomeComponent } from '../home/university-connect-home.component';
import { UniversityConnectAboutComponent } from '../about/university-connect-about.component';
import { ResourceListingComponent } from '../resource-listing/resource-listing.component';
import { ResourceUploadComponent } from '../resource-upload/resource-upload.component';
import { ResourceDetailComponent } from '../resource-detail/resource-detail.component';
import { UniversityConnectFacade } from '../store/university-connect.facade';
import { UniversityConnectNavService } from '../services/university-connect-nav.service';

@Component({
  selector: 'app-university-connect-dialog-refactored',
  templateUrl: './university-connect-dialog.component.html',
  styleUrls: ['./university-connect-dialog-shell.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    UniversityConnectHomeComponent,
    UniversityConnectAboutComponent,
    ResourceListingComponent,
    ResourceUploadComponent,
    ResourceDetailComponent
  ]
})
export class UniversityConnectDialogRefactoredComponent implements OnInit {
  fullscreen = false;

  constructor(
    public dialogRef: MatDialogRef<UniversityConnectDialogRefactoredComponent>,
    public nav: UniversityConnectNavService,
    private facade: UniversityConnectFacade
  ) {}

  ngOnInit(): void {
    this.nav.goHome();
    this.facade.clearFilters();
    this.facade.loadAllResources();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleFullscreen(): void {
    this.fullscreen = !this.fullscreen;
    if (this.fullscreen) {
      this.dialogRef.addPanelClass('university-connect-dialog-fullscreen');
      this.dialogRef.updateSize('100vw', '100vh');
      return;
    }
    this.dialogRef.removePanelClass('university-connect-dialog-fullscreen');
    this.dialogRef.updateSize('95vw', '90vh');
  }
}
