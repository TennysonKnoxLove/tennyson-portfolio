import { createReducer, on } from '@ngrx/store';
import { DayOfWeek, Resource, ResourceFilter } from '../../../types/resource.types';
import { initialUniversityConnectState, DemoView, createEmptyResourceForm } from './university-connect.state';
import * as UniversityConnectActions from './university-connect.actions';

const WEEKDAY_BY_INDEX: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

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
    tags: [...state.tags, tag]
  })),

  on(UniversityConnectActions.removeTag, (state, { index }) => ({
    ...state,
    tags: state.tags.filter((_, i) => i !== index)
  })),

  on(UniversityConnectActions.addImage, (state, { previewUrl }) => ({
    ...state,
    imagePreviewUrls: [...state.imagePreviewUrls, previewUrl]
  })),

  on(UniversityConnectActions.removeImage, (state, { index }) => ({
    ...state,
    imagePreviewUrls: state.imagePreviewUrls.filter((_, i) => i !== index),
    uploadedImageUrls: state.uploadedImageUrls.filter((_, i) => i !== index)
  })),

  // Real Image Upload Actions
  on(UniversityConnectActions.uploadImage, (state) => ({
    ...state,
    error: null
  })),

  on(UniversityConnectActions.uploadImageSuccess, (state, { url }) => ({
    ...state,
    uploadedImageUrls: [...state.uploadedImageUrls, url]
  })),

  on(UniversityConnectActions.uploadImageFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Real Resource Publishing Actions
  on(UniversityConnectActions.publishResource, (state) => ({
    ...state,
    isSubmitting: true,
    error: null
  })),

  on(UniversityConnectActions.publishResourceSuccess, (state, { resource, message }) => {
    const allResources = upsertResource(state.allResources, resource);
    const userResources = upsertResource(state.userResources, resource);

    return {
      ...state,
      isSubmitting: false,
      currentView: DemoView.HOME,
      successMessage: message,
      showSuccessModal: true,
      currentUploadStep: 1,
      tags: [],
      imagePreviewUrls: [],
      uploadedImageUrls: [],
      resourceForm: createEmptyResourceForm(),
      allResources,
      userResources,
      filteredResources: filterResources(allResources, state.currentFilters),
      error: null
    };
  }),

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

  on(UniversityConnectActions.loadAllResourcesSuccess, (state, { resources }) => ({
    ...state,
    isLoadingResources: false,
    allResources: resources,
    filteredResources: filterResources(resources, state.currentFilters)
  })),

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

  on(UniversityConnectActions.applyFilters, (state) => ({
    ...state,
    filteredResources: filterResources(state.allResources, state.currentFilters)
  })),

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
  }))
);

function upsertResource(resources: Resource[], resource: Resource): Resource[] {
  const existing = resources.findIndex(item => item.id === resource.id);
  if (existing === -1) {
    return [resource, ...resources];
  }

  return resources.map(item => item.id === resource.id ? resource : item);
}

function filterResources(resources: Resource[], filters: ResourceFilter): Resource[] {
  let filtered = [...resources];

  if (filters.category) {
    filtered = filtered.filter(resource =>
      resource.category?.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(resource => resource.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(resource => resource.price <= filters.priceMax!);
  }

  if (filters.description) {
    const query = filters.description.toLowerCase();
    filtered = filtered.filter(resource =>
      resource.description.toLowerCase().includes(query) ||
      resource.name.toLowerCase().includes(query)
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(resource =>
      filters.tags!.some(tag => resource.tags.includes(tag))
    );
  }

  const openDays = weekdaysInRange(filters.availabilityFrom, filters.availabilityTo);
  if (openDays) {
    filtered = filtered.filter(resource =>
      openDays.some(day => !!resource.availability?.[day]?.start)
    );
  }

  return filtered;
}

function weekdaysInRange(from?: Date, to?: Date): DayOfWeek[] | null {
  const start = toLocalDate(from);
  const end = toLocalDate(to);
  if (!start && !end) {
    return null;
  }

  const cursor = new Date(start ?? end!);
  const limit = new Date(end ?? start!);
  cursor.setHours(0, 0, 0, 0);
  limit.setHours(0, 0, 0, 0);
  if (cursor > limit) {
    const swappedStart = new Date(limit);
    limit.setTime(cursor.getTime());
    cursor.setTime(swappedStart.getTime());
  }

  const days: DayOfWeek[] = [];
  while (cursor <= limit && days.length < 7) {
    const day = WEEKDAY_BY_INDEX[cursor.getDay()];
    if (!days.includes(day)) {
      days.push(day);
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

function toLocalDate(value: Date | string | undefined): Date | null {
  if (!value) {
    return null;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new Date(value);
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
} 