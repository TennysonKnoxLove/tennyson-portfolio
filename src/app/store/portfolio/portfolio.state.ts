import { Project } from '../../types/project.types'; // Assuming Project type is here
import { DeveloperBio, TechStack } from '../../services/landing-page.service'; // Import new types

export interface PortfolioState {
  projects: Project[];
  featuredProjects: Project[];
  isLoading: boolean;
  error: any | null;
  techStack: TechStack[] | null; // Add techStack
  developerBio: DeveloperBio | null; // Add developerBio
  currentProjectId: string | null; // To track the ID of the project being viewed
  // selectedProject: Project | null; // Will be derived by a selector
}

export const initialPortfolioState: PortfolioState = {
  projects: [],
  featuredProjects: [],
  isLoading: false,
  error: null,
  techStack: null, // Initialize techStack
  developerBio: null, // Initialize developerBio
  currentProjectId: null, // Initialize currentProjectId
}; 