import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { UniversityConnectFacade } from '../store/university-connect.facade';
import { DemoView } from '../store/university-connect.state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-university-connect-dialog-refactored',
  templateUrl: './university-connect-dialog.component.html',
  styleUrls: ['./university-connect-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class UniversityConnectDialogRefactoredComponent implements OnInit, OnDestroy {
  DemoView = DemoView;
  private destroy$ = new Subject<void>();
  
  // Simple UI state only - no business logic
  username: string = '';
  rememberMe: boolean = false;
  currentTag: string = '';
  searchTerm: string = '';

  // Delegate all observables to facade (no local state)
  get currentView() { return this.facade.currentView$; }
  get currentUploadStep() { return this.facade.currentUploadStep$; }
  get formValidation() { return this.facade.formValidation$; }
  get userResources() { return this.facade.userResources$; }
  get isLoadingUserResources() { return this.facade.isLoadingUserResources$; }
  get showPaymentOverlay() { return this.facade.showPaymentOverlay$; }
  get selectedResource() { return this.facade.selectedResource$; }
  get showDeleteConfirmModal() { return this.facade.showDeleteConfirmModal$; }
  get deleteResourceData() { return this.facade.deleteResourceData$; }
  get showSuccessModal() { return this.facade.showSuccessModal$; }
  get successMessage() { return this.facade.successMessage$; }
  get imagePreviewUrls() { return this.facade.imagePreviewUrls$; }
  get uploadedImages() { return this.facade.uploadedImages$; }
  get tags() { return this.facade.tags$; }
  get currentUser() { return this.facade.currentUser$; }
  get isLoading() { return this.facade.isLoading$; }
  get isLoadingResources() { return this.facade.isLoadingResources$; }
  get allResources() { return this.facade.allResources$; }
  get filteredResources() { return this.facade.filteredResources$; }
  get hasActiveFilters() { return this.facade.hasActiveFilters$; }
  get isFullscreen() { return this.facade.isFullscreen$; }
  
  // State from facade (no local management)
  get filterForm() { return this.facade.filterForm$; }
  get resourceForm() { return this.facade.resourceForm$; }
  get categories() { return this.facade.categories; }

  constructor(
    public dialogRef: MatDialogRef<UniversityConnectDialogRefactoredComponent>,
    public facade: UniversityConnectFacade
  ) {}

  ngOnInit(): void {
    // Just load resources - no complex subscriptions
    this.facade.loadAllResources();
    
    // DEBUG: Track view changes
    this.currentView.subscribe(view => {
      console.log('🎭 University Connect Demo - Current View:', DemoView[view]);
    });
    
    // DEBUG: Track user login state
    this.currentUser.subscribe(user => {
      console.log('🎭 University Connect Demo - Current User:', user);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // UI Event Handlers (delegate everything to facade)
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Authentication Actions (delegate to facade)
  login(username: string): void {
    console.log('🎭 University Connect Demo - Login called with username:', username);
    if (username && username.trim()) {
      this.facade.handleLogin(username.trim());
    }
  }

  logout(): void {
    this.facade.logout();
  }

  // Upload Actions (delegate to facade)
  nextUploadStep(): void {
    // Auto-save any uncommitted tag before proceeding
    if (this.currentTag.trim()) {
      this.facade.addTag(this.currentTag.trim());
      this.currentTag = '';
    }
    
    // Simple validation without nested subscriptions
    this.facade.nextUploadStep();
  }

  prevUploadStep(): void {
    this.facade.prevUploadStep();
  }

  addTag(): void {
    if (this.currentTag.trim()) {
      this.facade.addTag(this.currentTag.trim());
      this.currentTag = ''; // Clear the input after adding
    }
  }

  removeTag(index: number): void {
    this.facade.removeTag(index);
  }

  handleFileSelection(event: any): void {
    const files = event.target.files;
    if (files) {
      this.facade.handleFileSelection(files);
    }
  }

  handleImageDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.facade.handleFileSelection(event.dataTransfer.files);
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  removeImage(index: number): void {
    this.facade.removeImage(index);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('imageFileInput') as HTMLInputElement;
    fileInput?.click();
  }

  // Payment Actions (delegate to facade)
  bookResource(resource: any): void {
    this.facade.showPaymentOverlay(resource);
  }

  closePaymentOverlay(): void {
    this.facade.hidePaymentOverlay();
  }

  submitPayment(): void {
    this.facade.hidePaymentOverlay();
    this.facade.showSuccessModal('🎭 Booking confirmed! (Demo)');
  }

  handlePaymentSubmit(): void {
    this.facade.hidePaymentOverlay();
    this.facade.showSuccessModal('🎭 Booking confirmed! (Demo)');
  }

  // Resource Management (delegate to facade)
  toggleFullscreen(): void {
    this.facade.toggleFullscreen();
  }
  
  // Navigation Methods (delegate to facade)
  goToHome(): void {
    this.facade.goToHome();
  }
  
  goToBrowse(): void {
    this.facade.goToBrowse();
  }
  
  goToUpload(): void {
    this.facade.goToUpload();
  }
  
  goToMyResources(): void {
    this.facade.goToMyResources();
  }
  
  // Tag Management (local UI state only)
  onTagKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag();
    }
  }

  // Resource Deletion (delegate to facade)
  deleteResource(resourceId: string, resourceName: string): void {
    this.facade.showDeleteConfirmModal(resourceId, resourceName);
  }

  viewBookings(resourceId: string, resourceName: string): void {
    this.goToBrowse();
  }

  cancelDelete(): void {
    this.facade.hideDeleteConfirmModal();
  }

  confirmDelete(): void {
    this.deleteResourceData.subscribe(deleteData => {
      if (deleteData) {
        this.facade.deleteResource(deleteData.id);
      }
    }).unsubscribe();
  }

  closeSuccessModal(): void {
    this.facade.hideSuccessModal();
  }

  // Form Actions (delegate to facade - no local form management)
  publishResource(): void {
    // Validate tags before publishing
    this.tags.subscribe(tags => {
      if (!tags || tags.length === 0) {
        this.facade.showSuccessModal('🎭 At least one tag is required to publish a resource. (Demo)');
        return;
      }
      
      // Proceed with publishing if validation passes
      this.facade.publishResourceFromForm();
    }).unsubscribe();
  }

  // Filter Actions (delegate to facade - no local filter management)
  onFilterChange(field: string, value: string): void {
    this.facade.updateFilterForm(field, value);
  }

  clearFilters(): void {
    this.facade.resetFilterForm();
  }

  // Form field update helpers (delegate to facade)
  updateResourceFormField(field: string, value: string): void {
    this.facade.updateResourceForm(field, value);
  }

  // Search functionality (delegate to facade)
  performSearch(): void {
    this.facade.searchResources(this.searchTerm);
    this.searchTerm = ''; // Clear search input after search
  }

  onSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.performSearch();
    }
  }
}