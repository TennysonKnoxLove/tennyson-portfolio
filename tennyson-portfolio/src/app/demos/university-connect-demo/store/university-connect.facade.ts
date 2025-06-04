import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Resource, ResourceFilter } from '../../../types/resource.types';
import { UserResponse } from '../../../types/user.types';
import { DemoView, LoginForm, ResourceForm } from './university-connect.state';
import * as UniversityConnectActions from './university-connect.actions';
import * as UniversityConnectSelectors from './university-connect.selectors';

@Injectable({
  providedIn: 'root'
})
export class UniversityConnectFacade {
  constructor(private store: Store) {}

  // View Observables
  get currentView$(): Observable<DemoView> {
    return this.store.select(UniversityConnectSelectors.selectCurrentView);
  }

  get isFullscreen$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsFullscreen);
  }

  // User Observables
  get currentUser$(): Observable<UserResponse | null> {
    return this.store.select(UniversityConnectSelectors.selectCurrentUser);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsLoggedIn);
  }

  // Upload Observables
  get currentUploadStep$(): Observable<number> {
    return this.store.select(UniversityConnectSelectors.selectCurrentUploadStep);
  }

  get tags$(): Observable<string[]> {
    return this.store.select(UniversityConnectSelectors.selectTags);
  }

  get currentTag$(): Observable<string> {
    return this.store.select(UniversityConnectSelectors.selectCurrentTag);
  }

  get uploadedImages$(): Observable<File[]> {
    return this.store.select(UniversityConnectSelectors.selectUploadedImages);
  }

  get imagePreviewUrls$(): Observable<string[]> {
    return this.store.select(UniversityConnectSelectors.selectImagePreviewUrls);
  }

  get uploadedImageUrls$(): Observable<string[]> {
    return this.store.select(UniversityConnectSelectors.selectUploadedImageUrls);
  }

  get hasUploadedImages$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectHasUploadedImages);
  }

  get canProceedToNextStep$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectCanProceedToNextStep);
  }

  get canPublishResource$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectCanPublishResource);
  }

  get uploadProgress$(): Observable<number> {
    return this.store.select(UniversityConnectSelectors.selectUploadProgress);
  }

  // Resource Observables
  get allResources$(): Observable<Resource[]> {
    return this.store.select(UniversityConnectSelectors.selectAllResources);
  }

  get userResources$(): Observable<Resource[]> {
    return this.store.select(UniversityConnectSelectors.selectUserResources);
  }

  get filteredResources$(): Observable<Resource[]> {
    return this.store.select(UniversityConnectSelectors.selectFilteredResources);
  }

  get currentFilters$(): Observable<ResourceFilter> {
    return this.store.select(UniversityConnectSelectors.selectCurrentFilters);
  }

  get hasActiveFilters$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectHasActiveFilters);
  }

  get resourceCount$(): Observable<number> {
    return this.store.select(UniversityConnectSelectors.selectResourceCount);
  }

  get userResourceCount$(): Observable<number> {
    return this.store.select(UniversityConnectSelectors.selectUserResourceCount);
  }

  // Modal Observables
  get showPaymentOverlay$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectShowPaymentOverlay);
  }

  get selectedResource$(): Observable<Resource | null> {
    return this.store.select(UniversityConnectSelectors.selectSelectedResource);
  }

  get showDeleteConfirmModal$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectShowDeleteConfirmModal);
  }

  get showSuccessModal$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectShowSuccessModal);
  }

  get successMessage$(): Observable<string> {
    return this.store.select(UniversityConnectSelectors.selectSuccessMessage);
  }

  get deleteResourceData$(): Observable<{ id: string; name: string } | null> {
    return this.store.select(UniversityConnectSelectors.selectDeleteResourceData);
  }

  // Loading Observables
  get isLoading$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsLoading);
  }

  get isLoadingResources$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsLoadingResources);
  }

  get isLoadingUserResources$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsLoadingUserResources);
  }

  get isSubmitting$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsSubmitting);
  }

  get isAnyLoading$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectIsAnyLoading);
  }

  // Error Observables
  get error$(): Observable<string | null> {
    return this.store.select(UniversityConnectSelectors.selectError);
  }

  get hasError$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectHasError);
  }

  // Filter Form Observables
  get filterForm$(): Observable<any> {
    return this.store.select(UniversityConnectSelectors.selectFilterForm);
  }

  // Resource Form Observables  
  get resourceForm$(): Observable<any> {
    return this.store.select(UniversityConnectSelectors.selectResourceForm);
  }

  // Available categories for filters
  get categories() {
    return [
      { value: '', display: 'All Categories' },
      { value: 'space', display: 'Space' },
      { value: 'equipment', display: 'Equipment' },
      { value: 'lab', display: 'Lab' },
      { value: 'service', display: 'Service' },
      { value: 'software', display: 'Software' },
      { value: 'academic', display: 'Academic' }
    ];
  }

  // Computed Observables
  get demoStatus$(): Observable<any> {
    return this.store.select(UniversityConnectSelectors.selectDemoStatus);
  }

  get formValidation$(): Observable<any> {
    return this.store.select(UniversityConnectSelectors.selectFormValidation);
  }

  // View Actions
  switchView(view: DemoView): void {
    this.store.dispatch(UniversityConnectActions.setCurrentView({ view }));
  }

  goToHome(): void {
    this.switchView(DemoView.HOME);
  }

  goToBrowse(): void {
    this.switchView(DemoView.BROWSE);
    // Load all resources when switching to browse view
    this.loadAllResources();
  }

  goToUpload(): void {
    this.switchView(DemoView.UPLOAD);
  }

  goToMyResources(): void {
    this.switchView(DemoView.MY_RESOURCES);
    // Load user resources when switching to this view
    this.loadUserResources();
  }

  goToLogin(): void {
    this.switchView(DemoView.LOGIN);
  }

  toggleFullscreen(): void {
    this.store.dispatch(UniversityConnectActions.toggleFullscreen());
  }

  // Authentication Actions
  loginDemo(loginForm: LoginForm): void {
    this.store.dispatch(UniversityConnectActions.loginDemo({ loginForm }));
  }

  logout(): void {
    this.store.dispatch(UniversityConnectActions.logout());
  }

  // Upload Actions
  nextUploadStep(): void {
    this.store.dispatch(UniversityConnectActions.nextUploadStep());
  }

  prevUploadStep(): void {
    this.store.dispatch(UniversityConnectActions.prevUploadStep());
  }

  addTag(tag: string): void {
    this.store.dispatch(UniversityConnectActions.addTag({ tag }));
  }

  removeTag(index: number): void {
    this.store.dispatch(UniversityConnectActions.removeTag({ index }));
  }

  updateCurrentTag(tag: string): void {
    this.store.dispatch(UniversityConnectActions.updateCurrentTag({ tag }));
  }

  addImage(file: File, previewUrl: string): void {
    this.store.dispatch(UniversityConnectActions.addImage({ file, previewUrl }));
  }

  removeImage(index: number): void {
    this.store.dispatch(UniversityConnectActions.removeImage({ index }));
  }

  publishResource(resourceForm: ResourceForm): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        // Get tags and images from store and include them in the resource form
        this.tags$.subscribe(tags => {
          console.log('🏪 Tags from store:', tags);
          this.uploadedImageUrls$.subscribe(imageUrls => {
            console.log('🖼️ Image URLs from store:', imageUrls);
            const updatedResourceForm = {
              ...resourceForm,
              tags: tags,
              image: imageUrls.length > 0 ? imageUrls[0] : undefined // Use first uploaded image
            };

            console.log('📦 Updated resource form:', updatedResourceForm);

            this.store.dispatch(UniversityConnectActions.publishResource({ 
              resourceForm: updatedResourceForm, 
              userId: user.id 
            }));
          }).unsubscribe();
        }).unsubscribe();
      }
    }).unsubscribe();
  }

  uploadImage(file: File): void {
    this.store.dispatch(UniversityConnectActions.uploadImage({ file }));
  }

  // Real Resource Management Actions
  loadAllResources(): void {
    this.store.dispatch(UniversityConnectActions.loadAllResources());
  }

  loadUserResources(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.store.dispatch(UniversityConnectActions.loadUserResources({ userId: user.id }));
      }
    }).unsubscribe();
  }

  deleteResource(resourceId: string): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.store.dispatch(UniversityConnectActions.deleteResource({ 
          resourceId, 
          userId: user.id 
        }));
      }
    }).unsubscribe();
  }

  // Filter Actions
  updateFilters(filters: ResourceFilter): void {
    this.store.dispatch(UniversityConnectActions.updateFilters({ filters }));
  }

  applyFilters(filters: ResourceFilter): void {
    this.updateFilters(filters);
    this.store.dispatch(UniversityConnectActions.applyFilters());
  }

  clearFilters(): void {
    this.store.dispatch(UniversityConnectActions.clearFilters());
  }

  // Modal Actions
  showPaymentOverlay(resource: Resource): void {
    this.store.dispatch(UniversityConnectActions.showPaymentOverlay({ resource }));
  }

  hidePaymentOverlay(): void {
    this.store.dispatch(UniversityConnectActions.hidePaymentOverlay());
  }

  showDeleteConfirmModal(resourceId: string, resourceName: string): void {
    this.store.dispatch(UniversityConnectActions.showDeleteConfirmModal({ 
      resourceId, 
      resourceName 
    }));
  }

  hideDeleteConfirmModal(): void {
    this.store.dispatch(UniversityConnectActions.hideDeleteConfirmModal());
  }

  showSuccessModal(message: string): void {
    this.store.dispatch(UniversityConnectActions.showSuccessModal({ message }));
  }

  hideSuccessModal(): void {
    this.store.dispatch(UniversityConnectActions.hideSuccessModal());
  }

  // Error Actions
  clearError(): void {
    this.store.dispatch(UniversityConnectActions.clearError());
  }

  // Filter Form Actions - Business Logic moved from Component
  updateFilterForm(field: string, value: string): void {
    this.store.dispatch(UniversityConnectActions.updateFilterForm({ formField: field, value }));
    // Auto-apply filters on change
    this.applyCurrentFilters();
  }

  resetFilterForm(): void {
    this.store.dispatch(UniversityConnectActions.resetFilterForm());
    this.store.dispatch(UniversityConnectActions.clearFilters());
  }

  applyCurrentFilters(): void {
    this.filterForm$.subscribe(filterForm => {
      const filters = {
        description: filterForm.description || undefined,
        priceMin: filterForm.priceMin ? parseFloat(filterForm.priceMin) : undefined,
        priceMax: filterForm.priceMax ? parseFloat(filterForm.priceMax) : undefined,
        category: filterForm.category || undefined,
        availabilityFrom: filterForm.availabilityFrom ? new Date(filterForm.availabilityFrom) : undefined,
        availabilityTo: filterForm.availabilityTo ? new Date(filterForm.availabilityTo) : undefined
      };
      this.store.dispatch(UniversityConnectActions.updateFilters({ filters }));
      this.store.dispatch(UniversityConnectActions.applyFilters());
    }).unsubscribe();
  }

  // Resource Form Actions - Business Logic moved from Component
  updateResourceForm(field: string, value: string): void {
    this.store.dispatch(UniversityConnectActions.updateResourceForm({ formField: field, value }));
  }

  resetResourceForm(): void {
    this.store.dispatch(UniversityConnectActions.resetResourceForm());
  }

  publishResourceFromForm(): void {
    this.resourceForm$.subscribe(resourceForm => {
      this.currentUser$.subscribe(user => {
        if (user) {
          // Get tags and images from store and include them in the resource form
          this.tags$.subscribe(tags => {
            this.uploadedImageUrls$.subscribe(imageUrls => {
              const updatedResourceForm = {
                ...resourceForm,
                tags: tags,
                image: imageUrls.length > 0 ? imageUrls[0] : undefined
              };

              this.store.dispatch(UniversityConnectActions.publishResource({ 
                resourceForm: updatedResourceForm, 
                userId: user.id 
              }));
            }).unsubscribe();
          }).unsubscribe();
        }
      }).unsubscribe();
    }).unsubscribe();
  }

  // State Management
  resetState(): void {
    // Reset to initial state by logging out
    this.logout();
  }

  // Helper Methods for Components
  handleLogin(username: string, rememberMe: boolean = false): void {
    const loginForm: LoginForm = { username, rememberMe };
    this.loginDemo(loginForm);
  }

  handleResourcePublish(resourceForm: ResourceForm): void {
    this.publishResource(resourceForm);
  }

  handleResourceDelete(resourceId: string, resourceName: string): void {
    this.showDeleteConfirmModal(resourceId, resourceName);
  }

  handleFileSelection(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = e.target?.result as string;
          this.addImage(file, previewUrl);
          
          // Upload to server
          this.uploadImage(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Search functionality - handles search from homepage
  searchResources(searchTerm: string): void {
    if (searchTerm.trim()) {
      // Set the description filter with the search term
      this.store.dispatch(UniversityConnectActions.updateFilterForm({ 
        formField: 'description', 
        value: searchTerm.trim() 
      }));
      
      // Update filters with the search term
      const filters = {
        description: searchTerm.trim(),
        priceMin: undefined,
        priceMax: undefined,
        category: undefined,
        availabilityFrom: undefined,
        availabilityTo: undefined
      };
      this.store.dispatch(UniversityConnectActions.updateFilters({ filters }));
      
      // Navigate to browse page (the reducer will now apply the filters when loading resources)
      this.goToBrowse();
    } else {
      // If empty search, just go to browse page
      this.goToBrowse();
    }
  }
} 