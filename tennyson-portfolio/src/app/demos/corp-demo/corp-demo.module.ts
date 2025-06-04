import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { corpDemoDialogComponent } from './dialog/corp-demo-dialog.component';
import { CsvExportDialogComponent } from './dialog/csv-export-dialog.component';
import { corpDemoDialogService } from './service/corp-demo-dialog.service';
import { corpFacadeService } from './store/corp.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatBadgeModule,
    corpDemoDialogComponent,
    CsvExportDialogComponent
  ],
  providers: [
    corpDemoDialogService,
    corpFacadeService
  ],
  exports: [
    corpDemoDialogComponent,
    CsvExportDialogComponent
  ]
})
export class corpDemoModule { } 