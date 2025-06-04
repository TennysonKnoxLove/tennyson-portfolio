import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
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

  checkApplicationHealth(): Observable<DockerResponse & { applicationHtml?: SafeHtml }> {
    return this.californiaApi.getApplicationHtml().pipe(
      map((response: any) => {
        if (response.success && response.html) {
          return {
            success: true,
            message: 'California application is ready',
            output: 'Application loaded successfully',
            containers: []
          };
        } else {
          return {
            success: false,
            message: 'Application not ready',
            output: 'Waiting for application to start...',
            containers: []
          };
        }
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