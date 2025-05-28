import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { ResourceService } from './resource.service'; // Will be removed from Facade
import * as ResourceActions from './resource.actions';
import { selectAllResources } from './resource.selectors';

@Injectable({
  providedIn: 'root'
})
export class ResourceFacadeService {
  constructor(
    private store: Store,
    // private resourceService: ResourceService // Removed
  ) {}
  
  get resources$(): Observable<any[]> {
    return this.store.select(selectAllResources);
  }
  
  loadResources(): void {
    // Dispatch the initiating action. The Effect will handle the API call.
    this.store.dispatch(ResourceActions.loadResources());
  }
  
  addResource(resource: any): void {
    // Dispatch the initiating action. The Effect will handle the API call.
    this.store.dispatch(ResourceActions.addResource({ resource }));
  }
} 