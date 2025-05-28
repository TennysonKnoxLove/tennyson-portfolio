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

@Injectable({
  providedIn: 'root'
})
export class UniversityConnectApi {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Real login endpoint that calls backend to find or create user
   */
  loginDemo(loginData: LoginRequest): Observable<UserResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/auth/login`, loginData).pipe(
      map(response => response.user)
    );
  }

  /**
   * Real image upload endpoint
   */
  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponse>(`${this.baseUrl}/api/resources/upload-image`, formData);
  }

  /**
   * Real create resource endpoint
   */
  createResource(resourceData: ResourceCreateRequest, userId: string): Observable<Resource> {
    const payload = {
      ...resourceData,
      resourceOwner: userId
    };

    return this.http.post<any>(`${this.baseUrl}/api/resources`, payload, {
      headers: { 'X-User-Id': userId }
    }).pipe(
      map(resource => this.transformResource(resource))
    );
  }

  /**
   * Real get all resources endpoint
   */
  getAllResources(): Observable<Resource[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/resources`).pipe(
      map(resources => resources.map(resource => this.transformResource(resource)))
    );
  }

  /**
   * Real get user resources endpoint
   */
  getMyResources(userId: string): Observable<Resource[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/resources/my-resources`, {
      headers: { 'X-User-Id': userId }
    }).pipe(
      map(resources => resources.map(resource => this.transformResource(resource)))
    );
  }

  /**
   * Real delete resource endpoint
   */
  deleteResource(resourceId: string, userId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.baseUrl}/api/resources/${resourceId}`, {
      headers: { 'X-User-Id': userId }
    });
  }

  /**
   * Transform backend ResourceResponse to frontend Resource format
   */
  private transformResource(backendResource: any): Resource {
    return {
      id: backendResource.id,
      name: backendResource.name,
      description: backendResource.description,
      image: backendResource.image ? `${this.baseUrl}${backendResource.image}` : '',
      tags: backendResource.tags || [],
      category: backendResource.category,
      price: backendResource.price,
      location: {
        address: backendResource.address,
        city: backendResource.city,
        state: backendResource.state,
        zip: backendResource.zipCode
      },
      availability: backendResource.availability || {},
      resourceOwner: backendResource.resourceOwner,
      status: backendResource.status
    };
  }
} 