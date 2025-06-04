import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as UniversityConnectActions from './university-connect.actions';
import { 
  UniversityConnectDataService,
  LoginDemoResponse,
  ImageUploadResponse,
  ResourcePublishResponse,
  DeleteResourceResponse
} from '../services/university-connect-data.service';

@Injectable()
export class UniversityConnectEffects {
  private actions$ = inject(Actions);
  private dataService = inject(UniversityConnectDataService);

  // Authentication Effects (Demo only - for UI demo purposes)
  loginDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.loginDemo),
      switchMap(({ loginForm }) =>
        this.dataService.loginDemo(loginForm).pipe(
          map((response: LoginDemoResponse) => UniversityConnectActions.loginDemoSuccess({
            user: response.user,
            message: response.message
          })),
          catchError(error => of(UniversityConnectActions.loginDemoFailure({
            error: '🎭 Demo Login Failed - Please try again'
          })))
        )
      )
    )
  );

  // Real Image Upload Effects
  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.uploadImage),
      switchMap(({ file }) =>
        this.dataService.uploadImage(file).pipe(
          map((response: ImageUploadResponse) => UniversityConnectActions.uploadImageSuccess({
            url: response.url
          })),
          catchError(error => of(UniversityConnectActions.uploadImageFailure({
            error: 'Failed to upload image - Please try again'
          })))
        )
      )
    )
  );

  // Real Resource Publishing Effects
  publishResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.publishResource),
      switchMap(({ resourceForm, userId }) =>
        this.dataService.publishResource(resourceForm, userId).pipe(
          map((response: ResourcePublishResponse) => UniversityConnectActions.publishResourceSuccess({
            resource: response.resource,
            message: response.message
          })),
          catchError(error => of(UniversityConnectActions.publishResourceFailure({
            error: 'Failed to publish resource - Please try again'
          })))
        )
      )
    )
  );

  // Real Resource Loading Effects
  loadAllResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.loadAllResources),
      switchMap(() =>
        this.dataService.loadAllResources().pipe(
          map(resources => UniversityConnectActions.loadAllResourcesSuccess({
            resources
          })),
          catchError(error => of(UniversityConnectActions.loadAllResourcesFailure({
            error: 'Failed to load resources - Please try again'
          })))
        )
      )
    )
  );

  loadUserResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.loadUserResources),
      switchMap(({ userId }) =>
        this.dataService.loadUserResources(userId).pipe(
          map(resources => UniversityConnectActions.loadUserResourcesSuccess({
            resources
          })),
          catchError(error => of(UniversityConnectActions.loadUserResourcesFailure({
            error: 'Failed to load user resources - Please try again'
          })))
        )
      )
    )
  );

  // Real Resource Deletion Effects
  deleteResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.deleteResource),
      switchMap(({ resourceId, userId }) =>
        this.dataService.deleteResource(resourceId, userId).pipe(
          map((response: DeleteResourceResponse) => UniversityConnectActions.deleteResourceSuccess({
            resourceId,
            message: response.message
          })),
          catchError(error => of(UniversityConnectActions.deleteResourceFailure({
            error: 'Failed to delete resource - Please try again'
          })))
        )
      )
    )
  );
} 