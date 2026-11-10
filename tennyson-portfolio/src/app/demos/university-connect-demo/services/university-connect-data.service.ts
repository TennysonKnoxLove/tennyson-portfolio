import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource, availabilityFromHours } from '../../../types/resource.types';
import { UserResponse } from '../../../types/user.types';
import { LoginForm, ResourceForm } from '../store/university-connect.state';
import { UniversityConnectApi } from '../api/university-connect.api';

export interface LoginDemoResponse {
  user: UserResponse;
  message?: string;
}

export interface ImageUploadResponse {
  url: string;
  filename: string;
}

export interface ResourcePublishResponse {
  resource: Resource;
  message: string;
}

export interface DeleteResourceResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityConnectDataService {
  constructor(private api: UniversityConnectApi) {}

  /**
   * 🎭 Demo login functionality (keeping for demo authentication only)
   */
  loginDemo(loginForm: LoginForm): Observable<LoginDemoResponse> {
    return this.api.loginDemo({
      username: loginForm.username
    }).pipe(
      map(user => ({
        user,
        message: `Welcome back, ${user.username}! 🎭 (Demo Mode)`
      }))
    );
  }

  /**
   * Real image upload functionality
   */
  uploadImage(file: File): Observable<ImageUploadResponse> {
    return this.api.uploadImage(file);
  }

  /**
   * Real resource publishing functionality
   */
  publishResource(resourceForm: ResourceForm, userId: string): Observable<ResourcePublishResponse> {
    console.log('📋 Publishing resource with form data:', resourceForm);
    console.log('🏷️ Tags from form:', resourceForm.tags);
    
    const resourceData = {
      name: resourceForm.resourceName.trim(),
      description: resourceForm.description.trim(),
      category: resourceForm.category,
      tags: resourceForm.tags || [],
      price: parseFloat(resourceForm.price.toString()),
      address: resourceForm.address.trim(),
      city: resourceForm.city.trim(),
      state: resourceForm.state.trim(),
      zipCode: resourceForm.zipCode.trim(),
      availability: availabilityFromHours(resourceForm.availability),
      image: resourceForm.image || undefined
    };

    console.log('🚀 Sending to API:', resourceData);
    console.log('🏷️ Tags being sent:', resourceData.tags);

    return this.api.createResource(resourceData, userId).pipe(
      map(resource => ({
        resource,
        message: `Resource "${resource.name}" published successfully!`
      }))
    );
  }

  /**
   * Real load all resources functionality
   */
  loadAllResources(): Observable<Resource[]> {
    return this.api.getAllResources();
  }

  /**
   * Real load user resources functionality
   */
  loadUserResources(userId: string): Observable<Resource[]> {
    return this.api.getMyResources(userId);
  }

  /**
   * Real delete resource functionality
   */
  deleteResource(resourceId: string, userId: string): Observable<DeleteResourceResponse> {
    return this.api.deleteResource(resourceId, userId);
  }
} 