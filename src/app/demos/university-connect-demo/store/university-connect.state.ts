import { Resource, ResourceFilter } from '../../../types/resource.types';
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
  rememberMe: boolean;
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
  
  // Availability
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  
  // End times
  mondayEnd: string;
  tuesdayEnd: string;
  wednesdayEnd: string;
  thursdayEnd: string;
  fridayEnd: string;
  saturdayEnd: string;
  sundayEnd: string;
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
  currentTag: string;
  uploadedImages: File[];
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

  // Form Validation
  formValidation: {
    isValid: boolean;
    errors: string[];
  };
}

export const initialUniversityConnectState: UniversityConnectState = {
  currentView: DemoView.LOGIN,
  isFullscreen: false,
  currentUser: null,
  currentUploadStep: 1,
  tags: [],
  currentTag: '',
  uploadedImages: [],
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
  error: null,
  formValidation: {
    isValid: true,
    errors: []
  }
}; 