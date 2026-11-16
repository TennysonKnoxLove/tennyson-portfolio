import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UniversityConnectFacade } from '../store/university-connect.facade';
import { UniversityConnectNavService } from '../services/university-connect-nav.service';
import { ResourceForm } from '../store/university-connect.state';
import { readResourceImages } from '../utils/read-resource-images';
import { US_STATES } from '../utils/us-states';
import {
  DayHours,
  DayOfWeek,
  WEEK_DAYS,
  availabilityFromHours
} from '../../../types/resource.types';

@Component({
  selector: 'app-resource-upload',
  templateUrl: './resource-upload.component.html',
  styleUrls: ['./resource-upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class ResourceUploadComponent implements OnInit {
  basicInfoForm!: FormGroup;
  pricingForm!: FormGroup;
  locationForm!: FormGroup;
  availabilityForm!: FormGroup;
  imagesForm!: FormGroup;
  
  // UI state properties
  selectedTags: string[] = [];
  uploadedImage: string | null = null;
  imageError: string | null = null;
  publishError: string | null = null;
  readonly weekDays = WEEK_DAYS;
  readonly states = US_STATES;
  
  private awaitingImageUpload = false;
  private awaitingPublish = false;

  constructor(
    private fb: FormBuilder,
    public facade: UniversityConnectFacade,
    private nav: UniversityConnectNavService,
    private destroyRef: DestroyRef
  ) {}

  goHome(): void {
    this.nav.goHome();
  }
  
  ngOnInit(): void {
    this.initForms();
    this.facade.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(error => {
      if (this.awaitingImageUpload && error) {
        this.imageError = error;
        this.awaitingImageUpload = false;
      }
      if (this.awaitingPublish && error) {
        this.publishError = error;
        this.awaitingPublish = false;
      }
    });
  }
  
  initForms(): void {
    // Basic Info Form
    this.basicInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required]
    });
    
    // Pricing Form
    this.pricingForm = this.fb.group({
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
    
    // Location Form
    this.locationForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]]
    });
    
    this.availabilityForm = this.fb.group(
      Object.fromEntries(
        WEEK_DAYS.map(day => [day.key, this.fb.group({ start: [''], end: [''] })])
      )
    );
    
    // Images Form
    this.imagesForm = this.fb.group({
      image: ['']
    });
  }
  
  addTag(tag: string): void {
    if (tag.trim() && !this.selectedTags.includes(tag.trim())) {
      this.selectedTags.push(tag.trim());
    }
  }
  
  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }
  
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const files = input?.files;
    if (!files?.length) {
      return;
    }

    readResourceImages(files, (file, previewUrl) => {
      this.imageError = null;
      this.awaitingImageUpload = true;
      this.uploadedImage = previewUrl;
      this.imagesForm.patchValue({ image: previewUrl });
      this.facade.addImage(previewUrl);
      this.facade.uploadImage(file);
    }, () => {
      this.awaitingImageUpload = false;
      this.imageError = 'That file isn’t an image. Choose a PNG, JPG, GIF, or SVG.';
    });

    if (input) {
      input.value = '';
    }
  }
  
  submitResource(): void {
    this.publishError = null;
    const hasRequiredTags = this.selectedTags.length > 0;
    
    if (
      this.basicInfoForm.valid &&
      this.pricingForm.valid &&
      this.locationForm.valid &&
      hasRequiredTags
    ) {
      // Create resource form data
      const resourceForm: ResourceForm = {
        // Basic Info
        resourceName: this.basicInfoForm.value.name,
        description: this.basicInfoForm.value.description,
        category: this.basicInfoForm.value.category,
        
        // Tags (now required)
        tags: this.selectedTags,
        
        // Image
        image: this.uploadedImage || undefined,
        
        // Pricing
        price: this.pricingForm.value.price,
        
        // Location
        address: this.locationForm.value.address,
        city: this.locationForm.value.city,
        state: this.locationForm.value.state,
        zipCode: this.locationForm.value.zip,
        availability: availabilityFromHours(this.availabilityForm.value)
      };
      
      this.awaitingPublish = true;
      this.facade.publishResource(resourceForm);
    } else {
      const missingFields = [];
      
      if (!this.basicInfoForm.valid) missingFields.push('basic information');
      if (!this.pricingForm.valid) missingFields.push('pricing');
      if (!this.locationForm.valid) missingFields.push('location');
      if (!hasRequiredTags) missingFields.push('at least one tag');
      
      this.publishError = `Add the missing fields before publishing: ${missingFields.join(', ')}.`;
    }
  }

  dayHours(day: DayOfWeek): DayHours | null {
    const hours = this.availabilityForm.get(day)?.value as DayHours | undefined;
    if (!hours?.start?.trim()) {
      return null;
    }

    return hours;
  }
} 