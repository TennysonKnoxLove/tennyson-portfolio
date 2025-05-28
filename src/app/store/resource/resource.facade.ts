import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Resource, ResourceFilter } from '../../types/resource.types';
import * as ResourceActions from './resource.actions';
import * as ResourceSelectors from './resource.selectors';

@Injectable({
  providedIn: 'root'
})
export class ResourceFacade {
  resources$: Observable<Resource[]>;
  filteredResources$: Observable<Resource[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  filters$: Observable<any>;

  constructor(private store: Store) {
    this.resources$ = this.store.select(ResourceSelectors.selectAllResources);
    this.filteredResources$ = this.store.select(ResourceSelectors.selectFilteredResources);
    this.loading$ = this.store.select(ResourceSelectors.selectResourceLoading);
    this.error$ = this.store.select(ResourceSelectors.selectResourceError);
    this.filters$ = this.store.select(ResourceSelectors.selectResourceFilters);
  }

  /**
   * Load all resources
   */
  loadResources(): void {
    this.store.dispatch(ResourceActions.loadResources());
  }

  /**
   * Add a new resource
   */
  addResource(resource: Resource): void {
    this.store.dispatch(ResourceActions.addResource({ resource }));
  }

  /**
   * Apply filters to resources
   */
  applyFilters(filters: ResourceFilter): void {
    this.store.dispatch(ResourceActions.filterResources({ filters }));
  }
} 