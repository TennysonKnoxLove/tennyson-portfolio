import { Availability, Resource, ResourceFilter } from '../../../types/resource.types';
import { UserResponse } from '../../../types/user.types';

export enum DemoView {
  LOGIN,
  HOME,
  BROWSE,
  UPLOAD,
  MY_RESOURCES
}

export interface LoginForm {
  username: string;
}

export interface ResourceForm {
  // Basic Info
  resourceName: string;
  description: string;
  category: string;
  
  // Tags and image
  tags?: string[];
  image?: string;
  
  // Pricing
  price: string;
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Hours keyed by weekday. A missing day means closed.
  availability: Availability;
}

export function createEmptyResourceForm(): ResourceForm {
  return {
    resourceName: '',
    description: '',
    category: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    availability: {},
  };
}

export interface ResourceFormValidation {
  isValid: boolean;
  errors: string[];
}

export function validateResourceForm(resourceForm: ResourceForm): ResourceFormValidation {
  const errors: string[] = [];

  if (!resourceForm.resourceName.trim()) {
    errors.push('Resource name is required');
  }

  if (!resourceForm.description.trim()) {
    errors.push('Description is required');
  }

  if (!resourceForm.category) {
    errors.push('Category is required');
  }

  if (!resourceForm.price || parseFloat(resourceForm.price.toString()) <= 0) {
    errors.push('Valid price is required');
  }

  if (!resourceForm.address.trim()) {
    errors.push('Address is required');
  }

  if (!resourceForm.city.trim()) {
    errors.push('City is required');
  }

  if (!resourceForm.state.trim()) {
    errors.push('State is required');
  }

  if (!resourceForm.zipCode.trim()) {
    errors.push('ZIP code is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export interface UniversityConnectState {
  // View State
  currentView: DemoView;
  isFullscreen: boolean;

  // User State
  currentUser: UserResponse | null;

  // Upload State
  currentUploadStep: number;
  tags: string[];
  imagePreviewUrls: string[];
  uploadedImageUrls: string[];

  // Resource State
  allResources: Resource[];
  userResources: Resource[];
  filteredResources: Resource[];
  currentFilters: ResourceFilter;

  // Filter Form State
  filterForm: {
    description: string;
    priceMin: string;
    priceMax: string;
    category: string;
    availabilityFrom: string;
    availabilityTo: string;
  };

  // Resource Form State
  resourceForm: ResourceForm;

  // Modal State
  showPaymentOverlay: boolean;
  selectedResource: Resource | null;
  showDeleteConfirmModal: boolean;
  deleteResourceData: { id: string; name: string } | null;
  showSuccessModal: boolean;
  successMessage: string;

  // Loading State
  isLoading: boolean;
  isLoadingResources: boolean;
  isLoadingUserResources: boolean;
  isSubmitting: boolean;

  // Error State
  error: string | null;
}

export const initialUniversityConnectState: UniversityConnectState = {
  currentView: DemoView.LOGIN,
  isFullscreen: false,
  currentUser: null,
  currentUploadStep: 1,
  tags: [],
  imagePreviewUrls: [],
  uploadedImageUrls: [],
  allResources: [],
  userResources: [],
  filteredResources: [],
  currentFilters: {},
  filterForm: {
    description: '',
    priceMin: '',
    priceMax: '',
    category: '',
    availabilityFrom: '',
    availabilityTo: '',
  },
  resourceForm: createEmptyResourceForm(),
  showPaymentOverlay: false,
  selectedResource: null,
  showDeleteConfirmModal: false,
  deleteResourceData: null,
  showSuccessModal: false,
  successMessage: '',
  isLoading: false,
  isLoadingResources: false,
  isLoadingUserResources: false,
  isSubmitting: false,
  error: null
}; 