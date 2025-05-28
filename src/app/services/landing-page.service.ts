import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PortfolioApi } from '../api/portfolio.api';
import { Project } from '../types/project.types';
import { TechStack, DeveloperBio } from '../types/landing-page.types';

// Re-export types for easier importing
export type { TechStack, DeveloperBio } from '../types/landing-page.types';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  constructor(private portfolioApi: PortfolioApi) {}
  
  /** 
   * Provides tech stack data for the landing page.
   * In a real application, this might come from an API call.
   */
  getTechStack(): TechStack[] {
    return [
      { name: 'TypeScript', icon: 'typescript-icon', percentage: 25 },
      { name: 'Angular', icon: 'angular-icon', percentage: 20 },
      { name: 'Material UI', icon: 'material-ui-icon', percentage: 18 },
      { name: 'Python', icon: 'python-icon', percentage: 15 },
      { name: 'Prisma', icon: 'prisma-icon', percentage: 12 },
      { name: 'Docker', icon: 'docker-icon', percentage: 6 },
      { name: 'Vite', icon: 'vite-icon', percentage: 4 },
    ];
  }

  /**
   * Gets the developer's short bio.
   * This could also come from a CMS or API in a real application.
   */
  getDeveloperBio(): DeveloperBio {
    return {
      name: 'Tennyson Love',
      title: 'Full-Stack Software Engineer',
      summary: 'Building modern, sleek applications with Angular, Python, and Docker. Specialized in NgRx state management architecture for scalable frontend solutions.'
    };
  }
  
  /**
   * Gets featured projects to display on the landing page
   */
  getFeaturedProjects(): Observable<Project[]> {
    return this.portfolioApi.getPortfolioData().pipe(
      map(response => response.projects.filter(project => project.featured))
    );
  }
} 