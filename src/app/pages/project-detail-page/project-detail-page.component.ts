import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Project } from '../../types/project.types';
import { PortfolioFacadeService } from '../../store/portfolio/portfolio.facade.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './project-detail-page.component.html',
  styleUrls: ['./project-detail-page.component.scss']
})
export class ProjectDetailPageComponent implements OnInit, OnDestroy {
  project$: Observable<Project | null | undefined>;
  isLoading$: Observable<boolean>;
  
  private routeSub: Subscription | undefined;
  private currentProject: Project | null | undefined = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioFacade: PortfolioFacadeService
  ) {
    this.project$ = this.portfolioFacade.selectedProject$;
    this.isLoading$ = this.portfolioFacade.isLoadingWithProject$;
  }

  ngOnInit(): void {
    // Handle route changes
    this.routeSub = this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      this.portfolioFacade.handleProjectRouteChange(projectId);
    });

    // Track current project for demo functionality
    this.project$.subscribe(project => {
      this.currentProject = project;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    this.portfolioFacade.setCurrentProject(null);
  }

  backToProjects(): void {
    this.router.navigate(['/projects']);
  }
  
  openProjectDemo(): void {
    this.portfolioFacade.openCurrentProjectDemo();
  }
}
