import { Component, OnInit } from '@angular/core';
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
import { ResourceForm } from '../store/university-connect.state';
import { readResourceImages } from '../utils/read-resource-images';
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
  readonly weekDays = WEEK_DAYS;
  
  constructor(
    private fb: FormBuilder,
    public facade: UniversityConnectFacade
  ) {}
  
  ngOnInit(): void {
    this.initForms();
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
      price: ['', [Validators.required, Validators.min(0)]]
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
    const files = (event.target as HTMLInputElement | null)?.files;
    if (!files?.length) {
      return;
    }

    readResourceImages(files, (file, previewUrl) => {
      if (!this.uploadedImage) {
        this.uploadedImage = previewUrl;
        this.imagesForm.patchValue({ image: previewUrl });
      }
      this.facade.addImage(previewUrl);
      this.facade.uploadImage(file);
    });
  }
  
  submitResource(): void {
    // Check if tags are provided (now required)
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
      
      // Delegate to facade
      this.facade.publishResource(resourceForm);
    } else {
      // Show specific error message based on what's missing
      let errorMessage = '🎭 Please fill in all required fields:';
      const missingFields = [];
      
      if (!this.basicInfoForm.valid) missingFields.push('Basic Information');
      if (!this.pricingForm.valid) missingFields.push('Pricing');
      if (!this.locationForm.valid) missingFields.push('Location');
      if (!hasRequiredTags) missingFields.push('Tags (at least one required)');
      
      errorMessage += ' ' + missingFields.join(', ') + '. (Demo)';
      this.facade.showSuccessModal(errorMessage);
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