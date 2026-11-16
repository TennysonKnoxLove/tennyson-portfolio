import { Project } from '../../types/project.types'; // Assuming Project type is here
import { DeveloperBio, TechStack } from '../../services/landing-page.service'; // Import new types

export interface PortfolioState {
  projects: Project[];
  featuredProjects: Project[];
  isLoading: boolean;
  error: any | null;
  techStack: TechStack[] | null; // Add techStack
  developerBio: DeveloperBio | null; // Add developerBio
}

export const initialPortfolioState: PortfolioState = {
  projects: [],
  featuredProjects: [],
  isLoading: false,
  error: null,
  techStack: null, // Initialize techStack
  developerBio: null, // Initialize developerBio
}; 