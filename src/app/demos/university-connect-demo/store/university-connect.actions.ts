import { createAction, props } from '@ngrx/store';
import { Resource } from '../../../types/resource.types';
import { UserResponse } from '../../../types/user.types';
import { LoginForm, ResourceForm, DemoView } from './university-connect.state';

// View Actions
export const setCurrentView = createAction(
  '[University Connect] Set Current View',
  props<{ view: DemoView }>()
);

export const toggleFullscreen = createAction(
  '[University Connect] Toggle Fullscreen'
);

// Authentication Actions (Demo only - for UI demo purposes)
export const loginDemo = createAction(
  '[University Connect] Login Demo',
  props<{ loginForm: LoginForm }>()
);

export const loginDemoSuccess = createAction(
  '[University Connect] Login Demo Success',
  props<{ user: UserResponse; message?: string }>()
);

export const loginDemoFailure = createAction(
  '[University Connect] Login Demo Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[University Connect] Logout'
);

// Upload Actions
export const nextUploadStep = createAction(
  '[University Connect] Next Upload Step'
);

export const prevUploadStep = createAction(
  '[University Connect] Previous Upload Step'
);

export const addTag = createAction(
  '[University Connect] Add Tag',
  props<{ tag: string }>()
);

export const removeTag = createAction(
  '[University Connect] Remove Tag',
  props<{ index: number }>()
);

export const updateCurrentTag = createAction(
  '[University Connect] Update Current Tag',
  props<{ tag: string }>()
);

export const addImage = createAction(
  '[University Connect] Add Image',
  props<{ file: File; previewUrl: string }>()
);

export const removeImage = createAction(
  '[University Connect] Remove Image',
  props<{ index: number }>()
);

// Real Image Upload Actions
export const uploadImage = createAction(
  '[University Connect] Upload Image',
  props<{ file: File }>()
);

export const uploadImageSuccess = createAction(
  '[University Connect] Upload Image Success',
  props<{ url: string }>()
);

export const uploadImageFailure = createAction(
  '[University Connect] Upload Image Failure',
  props<{ error: string }>()
);

// Real Resource Publishing Actions
export const publishResource = createAction(
  '[University Connect] Publish Resource',
  props<{ resourceForm: ResourceForm; userId: string }>()
);

export const publishResourceSuccess = createAction(
  '[University Connect] Publish Resource Success',
  props<{ resource: Resource; message: string }>()
);

export const publishResourceFailure = createAction(
  '[University Connect] Publish Resource Failure',
  props<{ error: string }>()
);

// Real Resource Management Actions
export const loadAllResources = createAction(
  '[University Connect] Load All Resources'
);

export const loadAllResourcesSuccess = createAction(
  '[University Connect] Load All Resources Success',
  props<{ resources: Resource[] }>()
);

export const loadAllResourcesFailure = createAction(
  '[University Connect] Load All Resources Failure',
  props<{ error: string }>()
);

export const loadUserResources = createAction(
  '[University Connect] Load User Resources',
  props<{ userId: string }>()
);

export const loadUserResourcesSuccess = createAction(
  '[University Connect] Load User Resources Success',
  props<{ resources: Resource[] }>()
);

export const loadUserResourcesFailure = createAction(
  '[University Connect] Load User Resources Failure',
  props<{ error: string }>()
);

export const deleteResource = createAction(
  '[University Connect] Delete Resource',
  props<{ resourceId: string; userId: string }>()
);

export const deleteResourceSuccess = createAction(
  '[University Connect] Delete Resource Success',
  props<{ resourceId: string; message: string }>()
);

export const deleteResourceFailure = createAction(
  '[University Connect] Delete Resource Failure',
  props<{ error: string }>()
);

// Filter Actions
export const updateFilters = createAction(
  '[University Connect] Update Filters',
  props<{ filters: any }>()
);

export const clearFilters = createAction(
  '[University Connect] Clear Filters'
);

export const applyFilters = createAction(
  '[University Connect] Apply Filters'
);

// Modal Actions
export const showPaymentOverlay = createAction(
  '[University Connect] Show Payment Overlay',
  props<{ resource: Resource }>()
);

export const hidePaymentOverlay = createAction(
  '[University Connect] Hide Payment Overlay'
);

export const showDeleteConfirmModal = createAction(
  '[University Connect] Show Delete Confirm Modal',
  props<{ resourceId: string; resourceName: string }>()
);

export const hideDeleteConfirmModal = createAction(
  '[University Connect] Hide Delete Confirm Modal'
);

export const showSuccessModal = createAction(
  '[University Connect] Show Success Modal',
  props<{ message: string }>()
);

export const hideSuccessModal = createAction(
  '[University Connect] Hide Success Modal'
);

// Filter Form Actions
export const updateFilterForm = createAction(
  '[University Connect] Update Filter Form',
  props<{ formField: string; value: string }>()
);

export const resetFilterForm = createAction(
  '[University Connect] Reset Filter Form'
);

export const updateResourceForm = createAction(
  '[University Connect] Update Resource Form', 
  props<{ formField: string; value: string }>()
);

export const resetResourceForm = createAction(
  '[University Connect] Reset Resource Form'
);

// Error Actions
export const clearError = createAction(
  '[University Connect] Clear Error'
); 