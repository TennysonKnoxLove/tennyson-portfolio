import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { DockerResponse, DockerContainer } from '../types/montana-demo.types';

@Injectable({
  providedIn: 'root'
})
export class MontanaApiService {
  private readonly API_BASE = 'http://localhost:8000/api/docker';

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

  checkApplicationHealth(): Observable<DockerResponse> {
    return this.http.get<DockerResponse>(`${this.API_BASE}/health-check`).pipe(
      catchError(() => this.getSimulatedHealthResponse())
    );
  }

  private getSimulatedStartResponse(): Observable<DockerResponse> {
    const containers: DockerContainer[] = [
      { name: 'montana-web', status: 'running', ports: ['3000:3000'], uptime: '2 minutes' },
      { name: 'montana-api', status: 'running', ports: ['8000:8000'], uptime: '2 minutes' },
      { name: 'montana-db', status: 'running', ports: ['5432:5432'], uptime: '2 minutes' }
    ];

    return of({
      success: true,
      message: 'Containers started successfully (Demo)',
      output: 'Creating montana-web...\nCreating montana-api...\nCreating montana-db...\nStarting containers...',
      containers
    }).pipe(delay(1000));
  }

  private getSimulatedStopResponse(): Observable<DockerResponse> {
    const containers: DockerContainer[] = [
      { name: 'montana-web', status: 'stopped', ports: ['3000:3000'] },
      { name: 'montana-api', status: 'stopped', ports: ['8000:8000'] },
      { name: 'montana-db', status: 'stopped', ports: ['5432:5432'] }
    ];

    return of({
      success: true,
      message: 'Containers stopped successfully (Demo)',
      output: 'Stopping montana-web...\nStopping montana-api...\nStopping montana-db...\nRemoving containers...',
      containers
    }).pipe(delay(800));
  }

  private getSimulatedStatusResponse(): Observable<DockerResponse> {
    const containers: DockerContainer[] = [
      { name: 'montana-web', status: 'running', ports: ['3000:3000'], uptime: '2 minutes' },
      { name: 'montana-api', status: 'running', ports: ['8000:8000'], uptime: '2 minutes' },
      { name: 'montana-db', status: 'running', ports: ['5432:5432'], uptime: '2 minutes' }
    ];

    return of({
      success: true,
      message: 'Status check completed (Demo)',
      output: 'abc123def456   montana-web:latest   "npm start"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp   montana-web\ndef456ghi789   montana-api:latest   "python app.py"   2 minutes ago   Up 2 minutes   0.0.0.0:8000->8000/tcp   montana-api\nghi789jkl012   postgres:13   "docker-entrypoint..."   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp   montana-db',
      containers
    }).pipe(delay(500));
  }

  private getSimulatedHealthResponse(): Observable<DockerResponse> {
    return of({
      success: true,
      message: 'Application is healthy (Demo)',
      output: 'Health check passed',
      containers: []
    }).pipe(delay(1000));
  }
} 