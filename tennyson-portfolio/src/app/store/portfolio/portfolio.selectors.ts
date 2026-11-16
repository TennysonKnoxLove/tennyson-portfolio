import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.state';
import { DeveloperBio, TechStack } from '../../services/landing-page.service';

// Feature selector for the portfolio state
export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

// Selector for all projects
export const selectAllProjects = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.projects
);

// Selector for featured projects
export const selectFeaturedProjects = createSelector(
  selectPortfolioState, // Use the main portfolio state selector
  (state: PortfolioState) => state.featuredProjects 
  // No need to re-filter here if reducer populates featuredProjects correctly
  // (state: PortfolioState) => state.projects.filter((project: Project) => project.featured)
);

// Selector for loading state
export const selectPortfolioIsLoading = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.isLoading
);

// Selector for error state
export const selectPortfolioError = createSelector(
  selectPortfolioState,
  (state: PortfolioState) => state.error
);

// Selector for Tech Stack
export const selectTechStack = createSelector(
  selectPortfolioState,
  (state: PortfolioState): TechStack[] | null => state.techStack
);

// Selector for Developer Bio
export const selectDeveloperBio = createSelector(
  selectPortfolioState,
  (state: PortfolioState): DeveloperBio | null => state.developerBio
);