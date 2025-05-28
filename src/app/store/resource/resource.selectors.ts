import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResourceState } from './resource.reducer';

export const selectResourceState = createFeatureSelector<ResourceState>('resource');

export const selectAllResources = createSelector(
  selectResourceState,
  (state: ResourceState) => state.resources
);

export const selectResourceLoading = createSelector(
  selectResourceState,
  (state: ResourceState) => state.loading
);

export const selectResourceError = createSelector(
  selectResourceState,
  (state: ResourceState) => state.error
);

export const selectResourceFilters = createSelector(
  selectResourceState,
  (state: ResourceState) => state.filters
);

export const selectFilteredResources = createSelector(
  selectAllResources,
  selectResourceFilters,
  (resources, filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      return resources;
    }
    
    return resources.filter(resource => {
      let matches = true;
      
      // Filter by description
      if (filters.description && resource.description) {
        matches = matches && resource.description.toLowerCase().includes(filters.description.toLowerCase());
      }
      
      // Filter by price range
      if (filters.priceMin !== undefined && filters.priceMin !== null) {
        matches = matches && resource.price >= filters.priceMin;
      }
      
      if (filters.priceMax !== undefined && filters.priceMax !== null) {
        matches = matches && resource.price <= filters.priceMax;
      }
      
      // Filter by tags
      if (filters.tags && filters.tags.length > 0) {
        matches = matches && filters.tags.some((tag: string) => 
          resource.tags.includes(tag)
        );
      }
      
      // Filter by category
      if (filters.category) {
        matches = matches && resource.category === filters.category;
      }
      
      return matches;
    });
  }
); 