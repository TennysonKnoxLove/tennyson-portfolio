import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CaliforniaDemoDialogComponent } from './dialog/california-demo-dialog.component';
import { CaliforniaDemoDialogService } from './services/california-demo-dialog.service';
import { CaliforniaFacadeService } from './store/california.facade';
import { CaliforniaDataService } from './services/california-data.service';
import { CaliforniaApiService } from './api/california.api';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
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