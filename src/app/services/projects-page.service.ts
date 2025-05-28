import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PortfolioApi } from '../api/portfolio.api';
import { Project, ProjectCategory, ProjectsResponse } from '../types/project.types';

@Injectable({
  providedIn: 'root'
})
export class ProjectsPageService {
  constructor(private portfolioApi: PortfolioApi) {}

  /**
   * Get all projects for the projects page
   */
  getProjects(): Observable<ProjectsResponse> {
    return this.portfolioApi.getPortfolioData();
  }

  /**
   * Get projects filtered by category
   * @param category The category to filter by
   */
  getProjectsByCategory(category: ProjectCategory): Observable<Project[]> {
    return this.portfolioApi.getPortfolioData().pipe(
      map((response: ProjectsResponse) => response.projects.filter((project: Project) => project.category === category))
    );
  }

  /**
   * Get featured projects
   */
  getFeaturedProjects(): Observable<Project[]> {
    return this.portfolioApi.getPortfolioData().pipe(
      map((response: ProjectsResponse) => response.projects.filter((project: Project) => project.featured))
    );
  }

  /**
   * Get a single project by ID
   * @param id The project ID
   */
  getProjectById(id: string): Observable<Project | undefined> {
    return this.portfolioApi.getPortfolioData().pipe(
      map((response: ProjectsResponse) => response.projects.find((project: Project) => project.id === id))
    );
  }
} 