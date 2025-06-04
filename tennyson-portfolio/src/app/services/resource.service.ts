import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from '../types/resource.types';
import { ResourceApi } from '../api/resource.api'; // Import the new API client

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private resourceApi: ResourceApi) {} // Inject ResourceApi

  getResources(): Observable<Resource[]> {
    return this.resourceApi.fetchResources();
  }

  getResourceById(id: string): Observable<Resource | undefined> {
    // To be implemented if ResourceApi gets getResourceById
    // For now, this will require adjustment or removal if not used by effects
    // return this.resourceApi.getResourceById(id);
    throw new Error('getResourceById not implemented in ResourceApi yet');
  }

  addResource(resource: Resource): Observable<Resource> {
    return this.resourceApi.addResource(resource);
  }

  updateResource(id: string, resource: Resource): Observable<Resource> {
    // To be implemented if ResourceApi gets updateResource
    // return this.resourceApi.updateResource(id, resource);
    throw new Error('updateResource not implemented in ResourceApi yet');
  }

  deleteResource(id: string): Observable<void> {
    // To be implemented if ResourceApi gets deleteResource
    // return this.resourceApi.deleteResource(id);
    throw new Error('deleteResource not implemented in ResourceApi yet');
  }
} 