import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UniversityConnectFacade } from '../store/university-connect.facade';

@Component({
  selector: 'app-resource-listing',
  templateUrl: './resource-listing.component.html',
  styleUrls: ['./resource-listing.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatTooltipModule
  ]
})
export class ResourceListingComponent implements OnInit {
  filterForm: FormGroup;
  searchControl = new FormControl('');
  
  // UI-only data (no business logic)
  categories = [
    { value: 'Space', display: 'Space' },
    { value: 'Equipment', display: 'Equipment' },
    { value: 'Lab', display: 'Lab' },
    { value: 'Service', display: 'Service' },
    { value: 'Software', display: 'Software' },
    { value: 'Academic', display: 'Academic' }
  ];
  
  availableTags = [
    'study room', 'equipment', 'computer', 'lab', 'quiet',
    'projector', 'calculator', 'software', 'math'
  ];
  
  selectedTags: string[] = [];
  displayMode: 'grid' | 'list' = 'grid';
  
  constructor(
    private fb: FormBuilder,
    public facade: UniversityConnectFacade
  ) {
    this.filterForm = this.fb.group({
      priceMin: [0],
      priceMax: [100],
      category: [''],
      availabilityFrom: [null],
      availabilityTo: [null]
    });
  }
  
  ngOnInit(): void {
    // Load resources on init
    this.facade.loadAllResources();
    
    // Listen for search changes
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilters();
    });
  }
  
  // UI Event Handlers (delegate to facade)
  toggleTag(tag: string): void {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    this.applyFilters();
  }
  
  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }
  
  applyFilters(): void {
    const filters = {
      description: this.searchControl.value || undefined,
      priceMin: this.filterForm.value.priceMin || undefined,
      priceMax: this.filterForm.value.priceMax || undefined,
      category: this.filterForm.value.category || undefined,
      availabilityFrom: this.filterForm.value.availabilityFrom || undefined,
      availabilityTo: this.filterForm.value.availabilityTo || undefined,
      tags: this.selectedTags.length ? this.selectedTags : undefined
    };
    
    this.facade.applyFilters(filters);
  }
  
  clearFilters(): void {
    this.filterForm.reset({
      priceMin: 0,
      priceMax: 100,
      category: '',
      availabilityFrom: null,
      availabilityTo: null
    });
    this.searchControl.setValue('');
    this.selectedTags = [];
    this.facade.clearFilters();
  }
  
  toggleDisplayMode(): void {
    this.displayMode = this.displayMode === 'grid' ? 'list' : 'grid';
  }
} 