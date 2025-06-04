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
import { CaliforniaDemoDialogComponent } from './dialog/california-demo-dialog.component';
import { CaliforniaDemoDialogService } from './service/california-demo-dialog.service';
import { CaliforniaFacadeService } from './store/california.facade';
import { CaliforniaDataService } from './services/california-data.service';
import { CaliforniaApiService } from './api/california.api';

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
    CaliforniaDemoDialogComponent
  ],
  providers: [
    CaliforniaDemoDialogService,
    CaliforniaFacadeService,
    CaliforniaDataService,
    CaliforniaApiService
  ],
  exports: [
    CaliforniaDemoDialogComponent
  ]
})
export class CaliforniaDemoModule { } 