import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UniversityConnectState } from './university-connect.state';

export const selectUniversityConnectState = createFeatureSelector<UniversityConnectState>('universityConnect');

// View Selectors
export const selectCurrentView = createSelector(
  selectUniversityConnectState,
  (state) => state.currentView
);

export const selectIsFullscreen = createSelector(
  selectUniversityConnectState,
  (state) => state.isFullscreen
);

// User Selectors
export const selectCurrentUser = createSelector(
  selectUniversityConnectState,
  (state) => state.currentUser
);

// Upload Selectors
export const selectCurrentUploadStep = createSelector(
  selectUniversityConnectState,
  (state) => state.currentUploadStep
);

export const selectTags = createSelector(
  selectUniversityConnectState,
  (state) => state.tags
);

export const selectImagePreviewUrls = createSelector(
  selectUniversityConnectState,
  (state) => state.imagePreviewUrls
);

export const selectUploadedImageUrls = createSelector(
  selectUniversityConnectState,
  (state) => state.uploadedImageUrls
);

// Resource Selectors
export const selectAllResources = createSelector(
  selectUniversityConnectState,
  (state) => state.allResources
);

export const selectUserResources = createSelector(
  selectUniversityConnectState,
  (state) => state.userResources
);

export const selectFilteredResources = createSelector(
  selectUniversityConnectState,
  (state) => state.filteredResources
);

export const selectCurrentFilters = createSelector(
  selectUniversityConnectState,
  (state) => state.currentFilters
);

export const selectHasActiveFilters = createSelector(
  selectCurrentFilters,
  (filters) => Object.keys(filters).length > 0
);

// Modal Selectors
export const selectShowPaymentOverlay = createSelector(
  selectUniversityConnectState,
  (state) => state.showPaymentOverlay
);

export const selectSelectedResource = createSelector(
  selectUniversityConnectState,
  (state) => state.selectedResource
);

export const selectShowDeleteConfirmModal = createSelector(
  selectUniversityConnectState,
  (state) => state.showDeleteConfirmModal
);

export const selectShowSuccessModal = createSelector(
  selectUniversityConnectState,
  (state) => state.showSuccessModal
);

export const selectSuccessMessage = createSelector(
  selectUniversityConnectState,
  (state) => state.successMessage
);

export const selectDeleteResourceData = createSelector(
  selectUniversityConnectState,
  (state) => state.deleteResourceData
);

// Loading Selectors
export const selectIsLoading = createSelector(
  selectUniversityConnectState,
  (state) => state.isLoading
);

export const selectIsLoadingResources = createSelector(
  selectUniversityConnectState,
  (state) => state.isLoadingResources
);

export const selectIsLoadingUserResources = createSelector(
  selectUniversityConnectState,
  (state) => state.isLoadingUserResources
);

export const selectIsSubmitting = createSelector(
  selectUniversityConnectState,
  (state) => state.isSubmitting
);

// Error Selectors
export const selectError = createSelector(
  selectUniversityConnectState,
  (state) => state.error
);

// Filter Form Selectors
export const selectFilterForm = createSelector(
  selectUniversityConnectState,
  (state: UniversityConnectState) => state.filterForm
);

// Resource Form Selectors
export const selectResourceForm = createSelector(
  selectUniversityConnectState,
  (state: UniversityConnectState) => state.resourceForm
); 