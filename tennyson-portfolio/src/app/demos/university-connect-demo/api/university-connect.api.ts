import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Resource } from '../../../types/resource.types';
import { UserResponse, LoginRequest, LoginResponse } from '../../../types/user.types';
import { ResourceCreateRequest } from '../../../types/resource.types';

export interface ImageUploadResponse {
  url: string;
  filename: string;
}

export interface DeleteResponse {
  message: string;
}

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
export class UniversityConnectApi {
  constructor(private http: HttpClient) {}

  private get baseUrl(): string {
    return apiOrigin();
  }

  /**
   * Real login endpoint that calls backend to find or create user
   */
  loginDemo(loginData: LoginRequest): Observable<UserResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginData).pipe(
      map(response => response.user)
    );
  }

  /**
   * Real image upload endpoint
   */
  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponse>(`${this.baseUrl}/resources/upload-image`, formData);
  }

  /**
   * Real create resource endpoint
   */
  createResource(resourceData: ResourceCreateRequest, userId: string): Observable<Resource> {
    const payload = {
      ...resourceData,
      resourceOwner: userId
    };

    return this.http.post<any>(`${this.baseUrl}/resources`, payload, {
      headers: { 'X-User-Id': userId }
    }).pipe(
      map(resource => this.transformResource(resource))
    );
  }

  /**
   * Real get all resources endpoint
   */
  getAllResources(): Observable<Resource[]> {
    return this.http.get<any[]>(`${this.baseUrl}/resources`).pipe(
      map(resources => resources.map(resource => this.transformResource(resource)))
    );
  }

  /**
   * Real get user resources endpoint
   */
  getMyResources(userId: string): Observable<Resource[]> {
    return this.http.get<any[]>(`${this.baseUrl}/resources/my-resources`, {
      headers: { 'X-User-Id': userId }
    }).pipe(
      map(resources => resources.map(resource => this.transformResource(resource)))
    );
  }

  /**
   * Real delete resource endpoint
   */
  deleteResource(resourceId: string, userId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.baseUrl}/resources/${resourceId}`, {
      headers: { 'X-User-Id': userId }
    });
  }

  /**
   * Transform backend ResourceResponse to frontend Resource format
   */
  private transformResource(backendResource: any): Resource {
    const location = backendResource.location ?? {};
    return {
      id: backendResource.id,
      name: backendResource.name,
      description: backendResource.description,
      image: this.resourceImage(backendResource.image),
      tags: backendResource.tags || [],
      category: backendResource.category,
      price: backendResource.price,
      location: {
        address: backendResource.address ?? location.address ?? '',
        city: backendResource.city ?? location.city ?? '',
        state: backendResource.state ?? location.state ?? '',
        zip: backendResource.zipCode ?? location.zip ?? ''
      },
      availability: backendResource.availability || {},
      resourceOwner: backendResource.resourceOwner || backendResource.resourceOwnerId || '',
      status: backendResource.status
    };
  }

  private resourceImage(image: string | undefined): string {
    if (!image) {
      return '';
    }
    if (/^(https?:|data:|assets\/)/.test(image)) {
      return image;
    }
    return `${this.baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  }
} 