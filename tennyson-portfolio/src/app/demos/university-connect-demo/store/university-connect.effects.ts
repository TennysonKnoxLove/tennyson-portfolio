import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as UniversityConnectActions from './university-connect.actions';
import { ResourceForm } from './university-connect.state';
import * as UniversityConnectSelectors from './university-connect.selectors';
import { 
  UniversityConnectDataService,
  LoginDemoResponse,
  ImageUploadResponse,
  ResourcePublishResponse,
  DeleteResourceResponse
} from '../services/university-connect-data.service';
import { DEMO_RESOURCES } from '../services/demo-resources';
import { UniversityConnectNavService } from '../services/university-connect-nav.service';

@Injectable()
export class UniversityConnectEffects {
  private actions$ = inject(Actions);
  private dataService = inject(UniversityConnectDataService);
  private store = inject(Store);
  private nav = inject(UniversityConnectNavService);

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
            error: error?.status === 400
              ? (error?.error?.detail || 'That file isn’t an image. Choose a PNG, JPG, GIF, or SVG.')
              : 'Couldn’t upload that image. Try a different file.'
          })))
        )
      )
    )
  );

  // Attach the signed-in user, store tags, and uploaded image before the API call.
  preparePublishResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.publishResourceRequested),
      withLatestFrom(
        this.store.select(UniversityConnectSelectors.selectCurrentUser),
        this.store.select(UniversityConnectSelectors.selectTags),
        this.store.select(UniversityConnectSelectors.selectUploadedImageUrls),
        this.store.select(UniversityConnectSelectors.selectResourceForm)
      ),
      switchMap(([{ resourceForm }, user, tags, imageUrls, storedForm]) => {
        const form = withStoredMedia(resourceForm ?? storedForm, tags, imageUrls);
        const publish = (userId: string) =>
          UniversityConnectActions.publishResource({ resourceForm: form, userId });

        if (user?.id) {
          return of(publish(user.id));
        }

        return this.dataService.loginDemo({ username: 'demo' }).pipe(
          switchMap((response) => of(
            UniversityConnectActions.loginDemoSuccess({
              user: response.user,
              message: response.message
            }),
            publish(response.user.id)
          )),
          catchError(() => of(UniversityConnectActions.publishResourceFailure({
            error: 'Couldn’t publish that resource. Try again.'
          })))
        );
      })
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
            error: publishErrorMessage(error)
          })))
        )
      )
    )
  );

  // Real Resource Loading Effects
  showPublishedResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.publishResourceSuccess),
      tap(() => this.nav.goBrowse())
    ),
    { dispatch: false }
  );

  loadAllResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UniversityConnectActions.loadAllResources),
      switchMap(() =>
        this.dataService.loadAllResources().pipe(
          map(resources => UniversityConnectActions.loadAllResourcesSuccess({
            resources
          })),
          catchError(() => of(UniversityConnectActions.loadAllResourcesSuccess({
            resources: DEMO_RESOURCES
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

function publishErrorMessage(error: { error?: { detail?: unknown }; message?: string }): string {
  const detail = error?.error?.detail;
  if (typeof detail === 'string' && detail.trim()) {
    return detail;
  }
  return 'Couldn’t publish that resource. Try again.';
}

function withStoredMedia(form: ResourceForm, tags: string[], imageUrls: string[]): ResourceForm {
  return {
    ...form,
    tags: form.tags?.length ? form.tags : tags,
    image: imageUrls[0] ?? form.image
  };
} 