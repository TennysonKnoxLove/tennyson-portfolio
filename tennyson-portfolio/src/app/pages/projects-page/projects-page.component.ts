import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PortfolioFacadeService } from '../../store/portfolio/portfolio.facade.service';
import { Project, ProjectCategory } from '../../types/project.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatChipsModule, 
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class ProjectsPageComponent implements OnInit {
  projects$: Observable<Project[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any | null>;
  selectedCategory$: Observable<ProjectCategory | 'all'>;
  
  // Category filters
  categories: { value: ProjectCategory, label: string }[] = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'devops', label: 'DevOps' }
  ];

  constructor(private portfolioFacade: PortfolioFacadeService) {
    this.projects$ = this.portfolioFacade.filteredProjects$;
    this.isLoading$ = this.portfolioFacade.isLoading$;
    this.error$ = this.portfolioFacade.error$;
    this.selectedCategory$ = this.portfolioFacade.selectedCategory$;
  }

  ngOnInit(): void {
    this.portfolioFacade.loadPortfolio();
  }

  /**
   * Filter projects by category
   */
  filterByCategory(category: ProjectCategory | 'all'): void {
    this.portfolioFacade.setSelectedCategory(category);
  }
}
