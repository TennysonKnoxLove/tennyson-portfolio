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

export const selectIsLoggedIn = createSelector(
  selectCurrentUser,
  (user) => !!user
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

export const selectCurrentTag = createSelector(
  selectUniversityConnectState,
  (state) => state.currentTag
);

export const selectUploadedImages = createSelector(
  selectUniversityConnectState,
  (state) => state.uploadedImages
);

export const selectImagePreviewUrls = createSelector(
  selectUniversityConnectState,
  (state) => state.imagePreviewUrls
);

export const selectUploadedImageUrls = createSelector(
  selectUniversityConnectState,
  (state) => state.uploadedImageUrls
);

export const selectHasUploadedImages = createSelector(
  selectUploadedImages,
  (images) => images.length > 0
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

export const selectResourceCount = createSelector(
  selectFilteredResources,
  (resources) => resources.length
);

export const selectUserResourceCount = createSelector(
  selectUserResources,
  (resources) => resources.length
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

export const selectIsAnyLoading = createSelector(
  selectIsLoading,
  selectIsLoadingResources,
  selectIsLoadingUserResources,
  selectIsSubmitting,
  (isLoading, isLoadingResources, isLoadingUserResources, isSubmitting) =>
    isLoading || isLoadingResources || isLoadingUserResources || isSubmitting
);

// Error Selectors
export const selectError = createSelector(
  selectUniversityConnectState,
  (state) => state.error
);

export const selectHasError = createSelector(
  selectError,
  (error) => !!error
);

// Filter Form Selectors
export const selectFilterForm = createSelector(
  selectUniversityConnectState,
  (state: UniversityConnectState) => state.filterForm
);

export const selectFilterFormField = (field: string) => createSelector(
  selectFilterForm,
  (filterForm) => filterForm[field as keyof typeof filterForm]
);

// Resource Form Selectors
export const selectResourceForm = createSelector(
  selectUniversityConnectState,
  (state: UniversityConnectState) => state.resourceForm
);

export const selectResourceFormField = (field: string) => createSelector(
  selectResourceForm,
  (resourceForm) => resourceForm[field as keyof typeof resourceForm]
);

// Computed Selectors
export const selectCanProceedToNextStep = createSelector(
  selectCurrentUploadStep,
  selectTags,
  selectUploadedImages,
  (step, tags, images) => {
    switch (step) {
      case 1: return true; // Basic info - validated in component
      case 2: return true; // Images - optional
      case 3: return true; // Pricing - validated in component
      case 4: return true; // Location - validated in component
      case 5: return true; // Availability - optional
      case 6: return true; // Review
      default: return false;
    }
  }
);

export const selectCanPublishResource = createSelector(
  selectCurrentUploadStep,
  selectIsSubmitting,
  (step, isSubmitting) => step === 6 && !isSubmitting
);

export const selectUploadProgress = createSelector(
  selectCurrentUploadStep,
  (step) => Math.round((step / 6) * 100)
);

export const selectDemoStatus = createSelector(
  selectCurrentUser,
  selectCurrentView,
  selectIsLoading,
  (user, view, loading) => ({
    isLoggedIn: !!user,
    currentView: view,
    isLoading: loading,
    username: user?.username || null
  })
);

export const selectFormValidation = createSelector(
  selectResourceForm,
  selectTags,
  (form, tags) => ({
    isValid: !!(form.resourceName && form.description && form.category && form.price),
    hasTags: tags.length > 0,
    hasRequiredFields: !!(form.resourceName && form.description && form.category && form.price)
  })
); 