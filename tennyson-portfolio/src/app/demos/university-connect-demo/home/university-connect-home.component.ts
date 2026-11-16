import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UniversityConnectFacade } from '../store/university-connect.facade';
import { UniversityConnectNavService } from '../services/university-connect-nav.service';
import { Resource } from '../../../types/resource.types';

@Component({
  selector: 'app-university-connect-home',
  templateUrl: './university-connect-home.component.html',
  styleUrls: ['./university-connect-home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class UniversityConnectHomeComponent implements OnInit {
  searchControl = new FormControl('');
  
  constructor(
    public facade: UniversityConnectFacade,
    private nav: UniversityConnectNavService
  ) {}
  
  ngOnInit(): void {
    this.facade.loadAllResources();
  }
  
  onSearch(): void {
    const searchTerm = this.searchControl.value?.trim();
    if (searchTerm) {
      this.facade.applyFilters({ description: searchTerm });
    } else {
      this.facade.clearFilters();
    }
    this.nav.goBrowse();
  }

  goBrowse(): void {
    this.nav.goBrowse();
  }

  goAbout(): void {
    this.nav.goAbout();
  }

  goUpload(): void {
    this.nav.goUpload();
  }

  openDetails(resource: Resource): void {
    this.nav.openDetails(resource);
  }
} 