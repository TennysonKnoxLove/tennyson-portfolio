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
  isSubmitting = false;
  
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
    
    // Availability Form
    this.availabilityForm = this.fb.group({
      monday: [''],
      tuesday: [''],
      wednesday: [''],
      thursday: [''],
      friday: [''],
      saturday: [''],
      sunday: ['']
    });
    
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
  
  onImageSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        this.imagesForm.patchValue({ image: this.uploadedImage });
      };
      reader.readAsDataURL(file);
      this.facade.handleFileSelection(files);
    }
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
      this.isSubmitting = true;
      
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
        
        // Availability
        monday: this.availabilityForm.value.monday || '',
        tuesday: this.availabilityForm.value.tuesday || '',
        wednesday: this.availabilityForm.value.wednesday || '',
        thursday: this.availabilityForm.value.thursday || '',
        friday: this.availabilityForm.value.friday || '',
        saturday: this.availabilityForm.value.saturday || '',
        sunday: this.availabilityForm.value.sunday || '',
        
        // End times (default values)
        mondayEnd: '17:00',
        tuesdayEnd: '17:00',
        wednesdayEnd: '17:00',
        thursdayEnd: '17:00',
        fridayEnd: '17:00',
        saturdayEnd: '',
        sundayEnd: ''
      };
      
      // Delegate to facade
      this.facade.publishResource(resourceForm);
      
      // Reset submitting state after a delay (demo purposes)
      setTimeout(() => {
        this.isSubmitting = false;
      }, 2000);
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
} 