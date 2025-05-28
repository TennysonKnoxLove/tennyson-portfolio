import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PortfolioActions from './portfolio.actions';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { LandingPageService } from '../../services/landing-page.service';
import { Project } from '../../types/project.types';

@Injectable()
export class PortfolioEffects {
  private actions$ = inject(Actions);
  private portfolioDataService = inject(PortfolioDataService);
  private landingPageService = inject(LandingPageService);

  loadPortfolio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolio),
      mergeMap(() =>
        this.portfolioDataService.fetchProjects().pipe(
          map((projects: Project[]) => PortfolioActions.loadPortfolioSuccess({ projects })),
          catchError((error) => of(PortfolioActions.loadPortfolioFailure({ error })))
        )
      )
    )
  );

  loadLandingPageStaticData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadLandingPageStaticData),
      switchMap(() => {
        try {
          const techStack = this.landingPageService.getTechStack();
          const developerBio = this.landingPageService.getDeveloperBio();
          return of(PortfolioActions.loadLandingPageStaticDataSuccess({ techStack, developerBio }));
        } catch (error) {
          return of(PortfolioActions.loadLandingPageStaticDataFailure({ error }));
        }
      })
    )
  );
} 