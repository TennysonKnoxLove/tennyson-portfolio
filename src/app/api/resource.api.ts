import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  Resource, 
  ResourceCreateRequest, 
  ResourceResponse, 
  CreateResourceResponse, 
  ImageUploadResponse,
  Availability
} from '../types/resource.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceApi {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponse>(`${this.baseUrl}/api/resources/upload-image`, formData);
  }

  createResource(resource: ResourceCreateRequest, userId: string): Observable<ResourceResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-User-Id': userId
    });

    return this.http.post<ResourceResponse>(`${this.baseUrl}/api/resources`, resource, { headers });
  }

  getMyResources(userId: string): Observable<ResourceResponse[]> {
    const headers = new HttpHeaders({
      'X-User-Id': userId
    });

    return this.http.get<ResourceResponse[]>(`${this.baseUrl}/api/resources/my-resources`, { headers });
  }

  getAllResources(): Observable<ResourceResponse[]> {
    return this.http.get<ResourceResponse[]>(`${this.baseUrl}/api/resources`);
  }

  deleteResource(resourceId: string, userId: string): Observable<{message: string}> {
    const headers = new HttpHeaders({
      'X-User-Id': userId
    });

    return this.http.delete<{message: string}>(`${this.baseUrl}/api/resources/${resourceId}`, { headers });
  }

  fetchResources(): Observable<Resource[]> {
    return this.getAllResources().pipe(
      map((responses: ResourceResponse[]) => 
        responses.map(response => this.mapResponseToResource(response))
      )
    );
  }

  addResource(resource: Resource): Observable<Resource> {
    const createRequest: ResourceCreateRequest = this.mapResourceToCreateRequest(resource);
    return this.createResource(createRequest, 'demo-user').pipe(
      map((response: ResourceResponse) => this.mapResponseToResource(response))
    );
  }

  private mapResponseToResource(response: ResourceResponse): Resource {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      image: response.image || '',
      tags: response.tags,
      location: {
        address: response.address,
        zip: response.zipCode,
        city: response.city,
        state: response.state
      },
      availability: response.availability as Availability,
      resourceOwner: response.resourceOwner,
      price: response.price,
      category: response.category
    };
  }

  private mapResourceToCreateRequest(resource: Resource): ResourceCreateRequest {
    return {
      name: resource.name,
      description: resource.description,
      image: resource.image,
      tags: resource.tags,
      price: resource.price,
      category: resource.category || 'Other',
      address: resource.location.address,
      city: resource.location.city,
      state: resource.location.state,
      zipCode: resource.location.zip,
      availability: resource.availability
    };
  }
} 