import { createReducer, on } from '@ngrx/store';
import { UniversityConnectState, initialUniversityConnectState, DemoView } from './university-connect.state';
import * as UniversityConnectActions from './university-connect.actions';

export const universityConnectReducer = createReducer(
  initialUniversityConnectState,

  // View Actions
  on(UniversityConnectActions.setCurrentView, (state, { view }) => ({
    ...state,
    currentView: view
  })),

  on(UniversityConnectActions.toggleFullscreen, (state) => ({
    ...state,
    isFullscreen: !state.isFullscreen
  })),

  // Authentication Actions (Demo)
  on(UniversityConnectActions.loginDemo, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(UniversityConnectActions.loginDemoSuccess, (state, { user, message }) => ({
    ...state,
    isLoading: false,
    currentUser: user,
    currentView: DemoView.HOME,
    successMessage: message || '',
    error: null
  })),

  on(UniversityConnectActions.loginDemoFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  on(UniversityConnectActions.logout, (state) => ({
    ...initialUniversityConnectState,
    isFullscreen: state.isFullscreen
  })),

  // Upload Actions
  on(UniversityConnectActions.nextUploadStep, (state) => ({
    ...state,
    currentUploadStep: state.currentUploadStep < 6 ? state.currentUploadStep + 1 : state.currentUploadStep
  })),

  on(UniversityConnectActions.prevUploadStep, (state) => ({
    ...state,
    currentUploadStep: state.currentUploadStep > 1 ? state.currentUploadStep - 1 : state.currentUploadStep
  })),

  on(UniversityConnectActions.addTag, (state, { tag }) => ({
    ...state,
    tags: [...state.tags, tag],
    currentTag: ''
  })),

  on(UniversityConnectActions.removeTag, (state, { index }) => ({
    ...state,
    tags: state.tags.filter((_, i) => i !== index)
  })),

  on(UniversityConnectActions.updateCurrentTag, (state, { tag }) => ({
    ...state,
    currentTag: tag
  })),

  on(UniversityConnectActions.addImage, (state, { file, previewUrl }) => ({
    ...state,
    uploadedImages: [...state.uploadedImages, file],
    imagePreviewUrls: [...state.imagePreviewUrls, previewUrl]
  })),

  on(UniversityConnectActions.removeImage, (state, { index }) => ({
    ...state,
    uploadedImages: state.uploadedImages.filter((_, i) => i !== index),
    imagePreviewUrls: state.imagePreviewUrls.filter((_, i) => i !== index),
    uploadedImageUrls: state.uploadedImageUrls.filter((_, i) => i !== index)
  })),

  // Real Image Upload Actions
  on(UniversityConnectActions.uploadImage, (state) => ({
    ...state,
    isSubmitting: true,
    error: null
  })),

  on(UniversityConnectActions.uploadImageSuccess, (state, { url }) => ({
    ...state,
    isSubmitting: false,
    uploadedImageUrls: [...state.uploadedImageUrls, url]
  })),

  on(UniversityConnectActions.uploadImageFailure, (state, { error }) => ({
    ...state,
    isSubmitting: false,
    error
  })),

  // Real Resource Publishing Actions
  on(UniversityConnectActions.publishResource, (state) => ({
    ...state,
    isSubmitting: true,
    error: null
  })),

  on(UniversityConnectActions.publishResourceSuccess, (state, { resource, message }) => ({
    ...state,
    isSubmitting: false,
    currentView: DemoView.HOME,
    successMessage: message,
    showSuccessModal: true,
    // Reset form state
    currentUploadStep: 1,
    tags: [],
    currentTag: '',
    uploadedImages: [],
    imagePreviewUrls: [],
    uploadedImageUrls: [],
    // Reset resource form
    resourceForm: {
      resourceName: '',
      description: '',
      category: '',
      price: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      mondayEnd: '',
      tuesdayEnd: '',
      wednesdayEnd: '',
      thursdayEnd: '',
      fridayEnd: '',
      saturdayEnd: '',
      sundayEnd: '',
    },
    error: null
  })),

  on(UniversityConnectActions.publishResourceFailure, (state, { error }) => ({
    ...state,
    isSubmitting: false,
    error
  })),

  // Real Resource Management Actions
  on(UniversityConnectActions.loadAllResources, (state) => ({
    ...state,
    isLoadingResources: true
  })),

  on(UniversityConnectActions.loadAllResourcesSuccess, (state, { resources }) => {
    // Apply existing filters to the newly loaded resources
    let filtered = [...resources];
    
    // Apply category filter
    if (state.currentFilters.category) {
      filtered = filtered.filter(resource => 
        resource.category && resource.category.toLowerCase() === state.currentFilters.category?.toLowerCase()
      );
    }
    
    // Apply price range filter
    if (state.currentFilters.priceMin !== undefined) {
      filtered = filtered.filter(resource => resource.price >= state.currentFilters.priceMin!);
    }
    if (state.currentFilters.priceMax !== undefined) {
      filtered = filtered.filter(resource => resource.price <= state.currentFilters.priceMax!);
    }
    
    // Apply description filter (search)
    if (state.currentFilters.description) {
      filtered = filtered.filter(resource => 
        resource.description.toLowerCase().includes(state.currentFilters.description!.toLowerCase()) ||
        resource.name.toLowerCase().includes(state.currentFilters.description!.toLowerCase())
      );
    }
    
    // Apply tags filter
    if (state.currentFilters.tags && state.currentFilters.tags.length > 0) {
      filtered = filtered.filter(resource => 
        state.currentFilters.tags!.some(tag => resource.tags.includes(tag))
      );
    }

    return {
      ...state,
      isLoadingResources: false,
      allResources: resources,
      filteredResources: filtered
    };
  }),

  on(UniversityConnectActions.loadAllResourcesFailure, (state, { error }) => ({
    ...state,
    isLoadingResources: false,
    error
  })),

  on(UniversityConnectActions.loadUserResources, (state) => ({
    ...state,
    isLoadingUserResources: true
  })),

  on(UniversityConnectActions.loadUserResourcesSuccess, (state, { resources }) => ({
    ...state,
    isLoadingUserResources: false,
    userResources: resources
  })),

  on(UniversityConnectActions.loadUserResourcesFailure, (state, { error }) => ({
    ...state,
    isLoadingUserResources: false,
    error
  })),

  on(UniversityConnectActions.deleteResource, (state) => ({
    ...state,
    isLoading: true
  })),

  on(UniversityConnectActions.deleteResourceSuccess, (state, { resourceId, message }) => ({
    ...state,
    isLoading: false,
    userResources: state.userResources.filter(r => r.id !== resourceId),
    allResources: state.allResources.filter(r => r.id !== resourceId),
    filteredResources: state.filteredResources.filter(r => r.id !== resourceId),
    successMessage: message,
    showSuccessModal: true,
    showDeleteConfirmModal: false,
    deleteResourceData: null
  })),

  on(UniversityConnectActions.deleteResourceFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    showDeleteConfirmModal: false,
    deleteResourceData: null
  })),

  // Filter Actions
  on(UniversityConnectActions.updateFilters, (state, { filters }) => ({
    ...state,
    currentFilters: { ...state.currentFilters, ...filters }
  })),

  on(UniversityConnectActions.clearFilters, (state) => ({
    ...state,
    currentFilters: {},
    filteredResources: state.allResources
  })),

  on(UniversityConnectActions.applyFilters, (state) => {
    let filtered = [...state.allResources];
    
    // Apply category filter
    if (state.currentFilters.category) {
      filtered = filtered.filter(resource => 
        resource.category && resource.category.toLowerCase() === state.currentFilters.category?.toLowerCase()
      );
    }
    
    // Apply price range filter
    if (state.currentFilters.priceMin !== undefined) {
      filtered = filtered.filter(resource => resource.price >= state.currentFilters.priceMin!);
    }
    if (state.currentFilters.priceMax !== undefined) {
      filtered = filtered.filter(resource => resource.price <= state.currentFilters.priceMax!);
    }
    
    // Apply description filter (search)
    if (state.currentFilters.description) {
      filtered = filtered.filter(resource => 
        resource.description.toLowerCase().includes(state.currentFilters.description!.toLowerCase()) ||
        resource.name.toLowerCase().includes(state.currentFilters.description!.toLowerCase())
      );
    }
    
    // Apply tags filter
    if (state.currentFilters.tags && state.currentFilters.tags.length > 0) {
      filtered = filtered.filter(resource => 
        state.currentFilters.tags!.some(tag => resource.tags.includes(tag))
      );
    }
    
    return {
      ...state,
      filteredResources: filtered
    };
  }),

  // Modal Actions
  on(UniversityConnectActions.showPaymentOverlay, (state, { resource }) => ({
    ...state,
    showPaymentOverlay: true,
    selectedResource: resource
  })),

  on(UniversityConnectActions.hidePaymentOverlay, (state) => ({
    ...state,
    showPaymentOverlay: false,
    selectedResource: null
  })),

  on(UniversityConnectActions.showDeleteConfirmModal, (state, { resourceId, resourceName }) => ({
    ...state,
    showDeleteConfirmModal: true,
    deleteResourceData: { id: resourceId, name: resourceName }
  })),

  on(UniversityConnectActions.hideDeleteConfirmModal, (state) => ({
    ...state,
    showDeleteConfirmModal: false,
    deleteResourceData: null
  })),

  on(UniversityConnectActions.showSuccessModal, (state, { message }) => ({
    ...state,
    showSuccessModal: true,
    successMessage: message
  })),

  on(UniversityConnectActions.hideSuccessModal, (state) => ({
    ...state,
    showSuccessModal: false,
    successMessage: ''
  })),

  // Error Actions
  on(UniversityConnectActions.clearError, (state) => ({
    ...state,
    error: null
  })),

  // Filter Form Actions
  on(UniversityConnectActions.updateFilterForm, (state, { formField, value }) => ({
    ...state,
    filterForm: {
      ...state.filterForm,
      [formField]: value
    }
  })),

  on(UniversityConnectActions.resetFilterForm, (state) => ({
    ...state,
    filterForm: {
      description: '',
      priceMin: '',
      priceMax: '',
      category: '',
      availabilityFrom: '',
      availabilityTo: '',
    }
  })),

  // Resource Form Actions  
  on(UniversityConnectActions.updateResourceForm, (state, { formField, value }) => ({
    ...state,
    resourceForm: {
      ...state.resourceForm,
      [formField]: value
    }
  })),

  on(UniversityConnectActions.resetResourceForm, (state) => ({
    ...state,
    resourceForm: {
      resourceName: '',
      description: '',
      category: '',
      price: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      mondayEnd: '',
      tuesdayEnd: '',
      wednesdayEnd: '',
      thursdayEnd: '',
      fridayEnd: '',
      saturdayEnd: '',
      sundayEnd: '',
    }
  }))
); 