import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project, ProjectsResponse } from '../types/project.types';

/**
 * API service for portfolio data
 * In a real application, this would make HTTP calls to backend endpoints
 * For now, it returns mock data
 */
@Injectable({
  providedIn: 'root'
})
export class PortfolioApi {
  constructor(private http: HttpClient) {}

  /**
   * Get the portfolio data from the backend
   */
  getPortfolioData(): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(`${environment.apiUrl}/api/portfolio`);
  }
} 