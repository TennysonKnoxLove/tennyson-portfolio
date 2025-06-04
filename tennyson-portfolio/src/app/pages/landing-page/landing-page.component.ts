import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
// import { LandingPageService, TechStack, DeveloperBio } from './landing-page.service'; // No longer directly needed
import { Project } from '../../types/project.types';
import { PortfolioFacadeService } from '../../store/portfolio/portfolio.facade.service';
import { Observable } from 'rxjs';
import { DeveloperBio, TechStack } from '../../services/landing-page.service'; // Keep for type usage if needed with async pipe

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class LandingPageComponent implements OnInit {
  // techStack: TechStack[] = []; // Replaced by observable
  // bio: DeveloperBio = { name: '', title: '', summary: '' }; // Replaced by observable
  
  techStack$: Observable<TechStack[] | null>;
  bio$: Observable<DeveloperBio | null>;

  featuredProjects$: Observable<Project[]>;
  isLoadingProjects$: Observable<boolean>;
  hasErrorProjects$: Observable<any>; // Renamed for clarity from hasError$

  constructor(
    // private landingPageService: LandingPageService, // No longer injected directly
    private portfolioFacade: PortfolioFacadeService
  ) {
    this.featuredProjects$ = this.portfolioFacade.featuredProjects$;
    this.isLoadingProjects$ = this.portfolioFacade.isLoading$;
    this.hasErrorProjects$ = this.portfolioFacade.error$;
    this.techStack$ = this.portfolioFacade.techStack$;
    this.bio$ = this.portfolioFacade.developerBio$;
  }

  ngOnInit(): void {
    // Get static data from LandingPageService - This is now handled by the facade/effects
    // this.techStack = this.landingPageService.getTechStack();
    // this.bio = this.landingPageService.getDeveloperBio();
    
    // Dispatch actions to load all necessary data
    this.portfolioFacade.loadPortfolio();
    this.portfolioFacade.loadLandingPageStaticData();
  }
}
