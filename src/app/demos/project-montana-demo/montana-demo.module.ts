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
import { MontanaDemoDialogComponent } from './dialog/montana-demo-dialog.component';
import { MontanaDemoDialogService } from './service/montana-demo-dialog.service';
import { MontanaFacadeService } from './store/montana.facade';
import { MontanaDataService } from './services/montana-data.service';
import { MontanaApiService } from './api/montana.api';

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
    MontanaDemoDialogComponent
  ],
  providers: [
    MontanaDemoDialogService,
    MontanaFacadeService,
    MontanaDataService,
    MontanaApiService
  ],
  exports: [
    MontanaDemoDialogComponent
  ]
})
export class MontanaDemoModule { } 