import { createAction, props } from '@ngrx/store';
import { Resource } from '../../types/resource.types';

// Load resources
export const loadResources = createAction('[Resource] Load Resources');
export const loadResourcesSuccess = createAction(
  '[Resource] Load Resources Success',
  props<{ resources: Resource[] }>()
);
export const loadResourcesFailure = createAction(
  '[Resource] Load Resources Failure',
  props<{ error: any }>()
);

// Add resource
export const addResource = createAction(
  '[Resource] Add Resource',
  props<{ resource: Resource }>()
);
export const addResourceSuccess = createAction(
  '[Resource] Add Resource Success',
  props<{ resource: Resource }>()
);
export const addResourceFailure = createAction(
  '[Resource] Add Resource Failure',
  props<{ error: any }>()
);

// Filter resources
export const filterResources = createAction(
  '[Resource] Filter Resources',
  props<{ filters: any }>()
); 