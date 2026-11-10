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

  // Upload Observables
  get currentUploadStep$(): Observable<number> {
    return this.store.select(UniversityConnectSelectors.selectCurrentUploadStep);
  }

  get tags$(): Observable<string[]> {
    return this.store.select(UniversityConnectSelectors.selectTags);
  }

  get imagePreviewUrls$(): Observable<string[]> {
    return this.store.select(UniversityConnectSelectors.selectImagePreviewUrls);
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

  get hasActiveFilters$(): Observable<boolean> {
    return this.store.select(UniversityConnectSelectors.selectHasActiveFilters);
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

  // Error Observables
  get error$(): Observable<string | null> {
    return this.store.select(UniversityConnectSelectors.selectError);
  }

  // Filter Form Observables
  get filterForm$(): Observable<any> {
    return this.store.select(UniversityConnectSelectors.selectFilterForm);
  }

  // Resource Form Observables
  get resourceForm$(): Observable<any> {
    return this.store.select(UniversityConnectSelectors.selectResourceForm);
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
    this.loadAllResources();
  }

  goToUpload(): void {
    this.switchView(DemoView.UPLOAD);
  }

  goToMyResources(): void {
    this.switchView(DemoView.MY_RESOURCES);
    this.loadUserResources();
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

  addImage(previewUrl: string): void {
    this.store.dispatch(UniversityConnectActions.addImage({ previewUrl }));
  }

  removeImage(index: number): void {
    this.store.dispatch(UniversityConnectActions.removeImage({ index }));
  }

  publishResource(resourceForm: ResourceForm): void {
    this.store.dispatch(UniversityConnectActions.publishResourceRequested({ resourceForm }));
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

  // Filter Form Actions
  updateFilterForm(field: string, value: string): void {
    this.store.dispatch(UniversityConnectActions.updateFilterForm({ formField: field, value }));
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
        availabilityFrom: parseFilterDate(filterForm.availabilityFrom),
        availabilityTo: parseFilterDate(filterForm.availabilityTo)
      };
      this.store.dispatch(UniversityConnectActions.updateFilters({ filters }));
      this.store.dispatch(UniversityConnectActions.applyFilters());
    }).unsubscribe();
  }

  // Resource Form Actions
  updateResourceForm(field: string, value: string): void {
    this.store.dispatch(UniversityConnectActions.updateResourceForm({ formField: field, value }));
  }

  publishResourceFromForm(): void {
    this.store.dispatch(UniversityConnectActions.publishResourceRequested({}));
  }

  // State Management
  resetState(): void {
    this.logout();
  }

  // Helper Methods for Components
  handleLogin(username: string): void {
    this.loginDemo({ username });
  }

  // Search functionality - handles search from homepage
  searchResources(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.store.dispatch(UniversityConnectActions.updateFilterForm({
        formField: 'description',
        value: searchTerm.trim()
      }));

      const filters = {
        description: searchTerm.trim(),
        priceMin: undefined,
        priceMax: undefined,
        category: undefined,
        availabilityFrom: undefined,
        availabilityTo: undefined
      };
      this.store.dispatch(UniversityConnectActions.updateFilters({ filters }));

      this.goToBrowse();
    } else {
      this.goToBrowse();
    }
  }
}

function parseFilterDate(value: string | Date | null | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) {
    return undefined;
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}
