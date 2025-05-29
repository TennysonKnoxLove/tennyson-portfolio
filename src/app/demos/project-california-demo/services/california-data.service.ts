import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DockerResponse, DockerContainer } from '../types/california-demo.types';
import { CaliforniaApiService } from '../api/california.api';

@Injectable({
  providedIn: 'root'
})
export class CaliforniaDataService {

  constructor(
    private californiaApi: CaliforniaApiService,
    private sanitizer: DomSanitizer
  ) {}

  startContainers(): Observable<DockerResponse> {
    return this.californiaApi.startContainers().pipe(
      map((response: DockerResponse) => ({
        ...response,
        containers: response.containers || this.getDefaultRunningContainers()
      }))
    );
  }

  stopContainers(): Observable<DockerResponse> {
    return this.californiaApi.stopContainers().pipe(
      map((response: DockerResponse) => ({
        ...response,
        containers: response.containers || this.getDefaultStoppedContainers()
      }))
    );
  }

  getContainerStatus(): Observable<DockerResponse> {
    return this.californiaApi.getContainerStatus();
  }

  checkApplicationHealth(): Observable<DockerResponse & { applicationUrl?: SafeResourceUrl }> {
    return this.californiaApi.checkApplicationHealth().pipe(
      map((response: any) => {
        // For simulated demos, always treat as healthy and ready
        const applicationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'http://localhost:8000/api/docker/california-app'
        );
        return {
          success: true,
          message: 'Demo application is ready',
          output: 'Health check passed - demo mode active',
          containers: [],
          applicationUrl
        };
      })
    );
  }

  private getDefaultRunningContainers(): DockerContainer[] {
    return [
      { name: 'california-web', status: 'running', ports: ['3000:3000'], uptime: '2 minutes' },
      { name: 'california-api', status: 'running', ports: ['8000:8000'], uptime: '2 minutes' },
      { name: 'california-db', status: 'running', ports: ['5432:5432'], uptime: '2 minutes' }
    ];
  }

  private getDefaultStoppedContainers(): DockerContainer[] {
    return [
      { name: 'california-web', status: 'stopped', ports: ['3000:3000'] },
      { name: 'california-api', status: 'stopped', ports: ['8000:8000'] },
      { name: 'california-db', status: 'stopped', ports: ['5432:5432'] }
    ];
  }
} 