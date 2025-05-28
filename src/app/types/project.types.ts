export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  impacts: string[];
  featured?: boolean;
  category?: ProjectCategory;
}

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'devops';

export interface ProjectsResponse {
  projects: Project[];
} 