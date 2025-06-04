import { createAction, props } from '@ngrx/store';
import { Project } from '../../types/project.types';
import { DeveloperBio, TechStack } from '../../services/landing-page.service';

// Actions for dynamic portfolio projects
export const loadPortfolio = createAction('[Portfolio API] Load Portfolio');
export const loadPortfolioSuccess = createAction(
  '[Portfolio API] Load Portfolio Success',
  props<{ projects: Project[] }>()
);
export const loadPortfolioFailure = createAction(
  '[Portfolio API] Load Portfolio Failure',
  props<{ error: any }>()
);

// Actions for static landing page data (bio, tech stack)
export const loadLandingPageStaticData = createAction(
  '[Landing Page] Load Static Data'
);

export const loadLandingPageStaticDataSuccess = createAction(
  '[Landing Page] Load Static Data Success',
  props<{ techStack: TechStack[]; developerBio: DeveloperBio }>()
);

export const loadLandingPageStaticDataFailure = createAction(
  '[Landing Page] Load Static Data Failure',
  props<{ error: any }>()
);

// Action for setting the current project ID for detail view
export const setCurrentProjectId = createAction(
  '[Portfolio Page] Set Current Project ID',
  props<{ projectId: string | null }>()
); 