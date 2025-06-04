import { createReducer, on } from '@ngrx/store';
import * as PortfolioActions from './portfolio.actions';
import { initialPortfolioState } from './portfolio.state';

export const portfolioReducer = createReducer(
  initialPortfolioState,
  on(PortfolioActions.loadPortfolio, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PortfolioActions.loadPortfolioSuccess, (state, { projects }) => ({
    ...state,
    projects,
    featuredProjects: projects.filter(p => p.featured), // Assuming featured is a boolean property on Project
    isLoading: false,
  })),
  on(PortfolioActions.loadPortfolioFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Handle static data loading
  on(PortfolioActions.loadLandingPageStaticData, (state) => ({
    ...state,
    // Optionally, set loading/error states for static data if it were async
    // isLoadingStaticData: true,
    // staticDataError: null,
  })),
  on(PortfolioActions.loadLandingPageStaticDataSuccess, (state, { techStack, developerBio }) => ({
    ...state,
    techStack,
    developerBio,
    // isLoadingStaticData: false, 
  })),
  on(PortfolioActions.loadLandingPageStaticDataFailure, (state, { error }) => ({
    ...state,
    // isLoadingStaticData: false,
    // staticDataError: error,
  })),
  // Handle setting current project ID
  on(PortfolioActions.setCurrentProjectId, (state, { projectId }) => ({
    ...state,
    currentProjectId: projectId,
  }))
); 