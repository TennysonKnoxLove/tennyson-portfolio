import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { UniversityConnectFacade } from '../store/university-connect.facade';

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
  
  constructor(public facade: UniversityConnectFacade) {}
  
  ngOnInit(): void {
    // Load resources when component initializes
    this.facade.loadAllResources();
  }
  
  onSearch(): void {
    const searchTerm = this.searchControl.value;
    if (searchTerm) {
      this.facade.applyFilters({ description: searchTerm });
    } else {
      this.facade.clearFilters();
    }
  }
} 