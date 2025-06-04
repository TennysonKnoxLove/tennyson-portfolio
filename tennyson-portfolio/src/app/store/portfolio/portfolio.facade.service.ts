import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import * as PortfolioActions from './portfolio.actions';
import * as PortfolioSelectors from './portfolio.selectors';
import { PortfolioState } from './portfolio.state';
import { Project, ProjectCategory } from '../../types/project.types';
import { DeveloperBio, TechStack } from '../../types/landing-page.types';
import { ProjectDemoService } from '../../services/project-demo.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioFacadeService {
  // Observables for dynamic project data
  readonly projects$: Observable<Project[]>;
  readonly featuredProjects$: Observable<Project[]>;
  readonly isLoading$: Observable<boolean>;
  readonly error$: Observable<any | null>;

  // Observables for static landing page data
  readonly techStack$: Observable<TechStack[] | null>;
  readonly developerBio$: Observable<DeveloperBio | null>;

  // Observable for the currently selected project
  readonly selectedProject$: Observable<Project | null | undefined>;

  // Computed loading state that includes project selection
  readonly isLoadingWithProject$: Observable<boolean>;

  // Project filtering
  private selectedCategorySubject = new BehaviorSubject<ProjectCategory | 'all'>('all');
  readonly selectedCategory$ = this.selectedCategorySubject.asObservable();
  readonly filteredProjects$: Observable<Project[]>;

  constructor(
    private store: Store<PortfolioState>,
    private projectDemoService: ProjectDemoService
  ) {
    this.projects$ = this.store.pipe(select(PortfolioSelectors.selectAllProjects));
    this.featuredProjects$ = this.store.pipe(select(PortfolioSelectors.selectFeaturedProjects));
    this.isLoading$ = this.store.pipe(select(PortfolioSelectors.selectPortfolioIsLoading));
    this.error$ = this.store.pipe(select(PortfolioSelectors.selectPortfolioError));
    this.techStack$ = this.store.pipe(select(PortfolioSelectors.selectTechStack));
    this.developerBio$ = this.store.pipe(select(PortfolioSelectors.selectDeveloperBio));
    this.selectedProject$ = this.store.pipe(select(PortfolioSelectors.selectCurrentProject));

    // Computed loading state
    this.isLoadingWithProject$ = combineLatest([
      this.isLoading$,
      this.selectedProject$.pipe(startWith(undefined))
    ]).pipe(
      map(([portfolioLoading, project]) => {
        return portfolioLoading || project === undefined;
      })
    );

    // Computed filtered projects
    this.filteredProjects$ = combineLatest([
      this.projects$,
      this.selectedCategory$
    ]).pipe(
      map(([projects, category]) => this.filterProjectsByCategory(projects, category))
    );
  }

  // Dispatcher for dynamic project data
  loadPortfolio(): void {
    this.store.dispatch(PortfolioActions.loadPortfolio());
  }

  // Dispatcher for static landing page data
  loadLandingPageStaticData(): void {
    this.store.dispatch(PortfolioActions.loadLandingPageStaticData());
  }

  // Dispatcher for setting the current project ID
  setCurrentProject(projectId: string | null): void {
    this.store.dispatch(PortfolioActions.setCurrentProjectId({ projectId }));
  }

  /**
   * Handle route change for project detail page
   * Contains the business logic for when to load portfolio data
   */
  handleProjectRouteChange(projectId: string | null): void {
    this.setCurrentProject(projectId);

    // Check if we need to load portfolio data
    this.projects$.pipe(take(1)).subscribe(projects => {
      const shouldLoadPortfolio = !projects || 
                                 projects.length === 0 || 
                                 (projectId && !projects.find(p => p.id === projectId));
      
      if (shouldLoadPortfolio) {
        this.loadPortfolio();
      }
    });
  }

  /**
   * Set the selected category filter
   */
  setSelectedCategory(category: ProjectCategory | 'all'): void {
    this.selectedCategorySubject.next(category);
  }

  /**
   * Open demo for the currently selected project
   */
  openCurrentProjectDemo(): void {
    this.selectedProject$.pipe(take(1)).subscribe(project => {
      this.projectDemoService.openProjectDemo(project);
    });
  }

  /**
   * Business logic for filtering projects by category
   */
  private filterProjectsByCategory(projects: Project[], category: ProjectCategory | 'all'): Project[] {
    if (category === 'all') {
      return [...projects];
    }
    
    return projects.filter(project => project.category === category);
  }
} 