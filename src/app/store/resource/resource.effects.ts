import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ResourceActions from './resource.actions';
import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../types/resource.types';

@Injectable()
export class ResourceEffects {
  private actions$ = inject(Actions);
  private resourceService = inject(ResourceService);

  loadResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceActions.loadResources),
      switchMap(() =>
        this.resourceService.getResources().pipe(
          map((resources: Resource[]) => ResourceActions.loadResourcesSuccess({ resources })),
          catchError((error) => of(ResourceActions.loadResourcesFailure({ error })))
        )
      )
    )
  );

  addResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResourceActions.addResource),
      switchMap((action) => 
        this.resourceService.addResource(action.resource).pipe(
          map((resource: Resource) => ResourceActions.addResourceSuccess({ resource })),
          catchError((error) => of(ResourceActions.addResourceFailure({ error })))
        )
      )
    )
  );
} 