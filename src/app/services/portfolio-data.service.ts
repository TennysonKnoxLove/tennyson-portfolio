import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PortfolioApi } from '../api/portfolio.api';
import { Project, ProjectsResponse } from '../types/project.types';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  constructor(private portfolioApi: PortfolioApi) {}

  fetchProjects(): Observable<Project[]> {
    return this.portfolioApi.getPortfolioData().pipe(
      map((response: ProjectsResponse) => response.projects)
    );
  }
} 