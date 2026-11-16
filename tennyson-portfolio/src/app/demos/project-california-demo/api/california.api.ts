import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { DockerResponse, DockerContainer } from '../types/california-demo.types';
import { environment } from '../../../../environments/environment';

function apiOrigin(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }
  return environment.apiUrl;
}

@Injectable({
  providedIn: 'root'
})
export class CaliforniaApiService {
  private readonly API_BASE = `${apiOrigin()}/docker`;

  constructor(private http: HttpClient) {}

  startContainers(): Observable<DockerResponse> {
    return this.http.post<DockerResponse>(`${this.API_BASE}/compose-up`, {}).pipe(
      catchError(() => this.getSimulatedStartResponse())
    );
  }

  stopContainers(): Observable<DockerResponse> {
    return this.http.post<DockerResponse>(`${this.API_BASE}/compose-down`, {}).pipe(
      catchError(() => this.getSimulatedStopResponse())
    );
  }

  getContainerStatus(): Observable<DockerResponse> {
    return this.http.get<DockerResponse>(`${this.API_BASE}/status`).pipe(
      catchError(() => this.getSimulatedStatusResponse())
    );
  }

  getApplicationHtml(): Observable<any> {
    return this.http.get<any>(`${this.API_BASE}/california-app`).pipe(
      catchError(() => this.getSimulatedAppResponse())
    );
  }

  private getSimulatedStartResponse(): Observable<DockerResponse> {
    const containers: DockerContainer[] = [
      { name: 'california-web', status: 'running', ports: ['3000:3000'], uptime: '2 minutes' },
      { name: 'california-api', status: 'running', ports: ['8000:8000'], uptime: '2 minutes' },
      { name: 'california-db', status: 'running', ports: ['5432:5432'], uptime: '2 minutes' }
    ];

    return of({
      success: true,
      message: 'Containers started successfully (Demo)',
      output: 'Creating california-web...\nCreating california-api...\nCreating california-db...\nStarting containers...',
      containers
    }).pipe(delay(500));
  }

  private getSimulatedStopResponse(): Observable<DockerResponse> {
    const containers: DockerContainer[] = [
      { name: 'california-web', status: 'stopped', ports: ['3000:3000'] },
      { name: 'california-api', status: 'stopped', ports: ['8000:8000'] },
      { name: 'california-db', status: 'stopped', ports: ['5432:5432'] }
    ];

    return of({
      success: true,
      message: 'Containers stopped successfully (Demo)',
      output: 'Stopping california-web...\nStopping california-api...\nStopping california-db...\nRemoving containers...',
      containers
    }).pipe(delay(500));
  }

  private getSimulatedStatusResponse(): Observable<DockerResponse> {
    const containers: DockerContainer[] = [
      { name: 'california-web', status: 'stopped', ports: ['3000:3000'] },
      { name: 'california-api', status: 'stopped', ports: ['8000:8000'] },
      { name: 'california-db', status: 'stopped', ports: ['5432:5432'] }
    ];

    return of({
      success: true,
      message: 'Status check completed (Demo)',
      output: 'abc123def456   california-web:latest   "npm start"   Exited   california-web\ndef456ghi789   california-api:latest   "python app.py"   Exited   california-api\nghi789jkl012   postgres:13   "docker-entrypoint..."   Exited   california-db\nNo containers are running.',
      containers
    }).pipe(delay(300));
  }

  private getSimulatedAppResponse(): Observable<any> {
    return of({
      success: false,
      url: null,
      message: "Backend unavailable - Cannot load application",
      status: "error",
      html: null
    }).pipe(delay(500));
  }
} 