import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.state';
import { Project } from '../../types/project.types';
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

// Selector for the current project ID
export const selectCurrentProjectId = createSelector(
  selectPortfolioState,
  (state: PortfolioState): string | null => state.currentProjectId
);

// Selector for the currently selected project object
export const selectCurrentProject = createSelector(
  selectAllProjects, // Depends on the list of all projects
  selectCurrentProjectId, // Depends on the current ID
  (projects: Project[], currentId: string | null): Project | null | undefined => {
    if (!currentId || !projects || projects.length === 0) {
      return null; // Or undefined, based on how you want to handle "not found"
    }
    return projects.find(project => project.id === currentId);
  }
); 