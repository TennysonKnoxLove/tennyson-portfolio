import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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

  /**
   * Set the selected category filter
   */
  setSelectedCategory(category: ProjectCategory | 'all'): void {
    this.selectedCategorySubject.next(category);
  }

  /**
   * Open the in-app demo popup for a project.
   */
  openProjectDemo(project: Project): void {
    this.projectDemoService.openProjectDemo(project);
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