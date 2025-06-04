import { createReducer, on } from '@ngrx/store';
import { Resource } from '../../types/resource.types';
import * as ResourceActions from './resource.actions';

export interface ResourceState {
  resources: Resource[];
  filters: any;
  loading: boolean;
  error: any;
}

export const initialState: ResourceState = {
  resources: [],
  filters: {},
  loading: false,
  error: null
};

export const resourceReducer = createReducer(
  initialState,
  
  // Load Resources
  on(ResourceActions.loadResources, state => ({
    ...state,
    loading: true
  })),
  
  on(ResourceActions.loadResourcesSuccess, (state, { resources }) => ({
    ...state,
    resources,
    loading: false,
    error: null
  })),
  
  on(ResourceActions.loadResourcesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Add Resource
  on(ResourceActions.addResource, state => ({
    ...state,
    loading: true
  })),
  
  on(ResourceActions.addResourceSuccess, (state, { resource }) => ({
    ...state,
    resources: [...state.resources, resource],
    loading: false,
    error: null
  })),
  
  on(ResourceActions.addResourceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Filter Resources
  on(ResourceActions.filterResources, (state, { filters }) => ({
    ...state,
    filters
  }))
); 