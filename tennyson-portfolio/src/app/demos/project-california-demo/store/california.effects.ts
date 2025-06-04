import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { map, delay, catchError, switchMap, tap } from 'rxjs/operators';
import * as CaliforniaActions from './california.actions';
import { CaliforniaDataService } from '../services/california-data.service';
import { DockerResponse } from '../types/california-demo.types';

@Injectable()
export class CaliforniaEffects {
  private actions$ = inject(Actions);
  private CaliforniaDataService = inject(CaliforniaDataService);

  // Command execution effect - routes commands to appropriate actions
  executeCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.executeCommand),
      map(({ command }) => {
        const trimmedCommand = command.trim();
        
        if (trimmedCommand === 'docker-compose up' || trimmedCommand === 'docker-compose up -d') {
          return CaliforniaActions.startDockerDemo();
        } else if (trimmedCommand === 'docker-compose down') {
          return CaliforniaActions.stopDockerDemo();
        } else if (trimmedCommand === 'docker ps') {
          return CaliforniaActions.checkDockerStatus();
        } else if (trimmedCommand === 'clear') {
          return CaliforniaActions.clearTerminal();
        } else if (trimmedCommand === 'help') {
          return CaliforniaActions.showDockerHelp();
        } else if (trimmedCommand !== '') {
          return CaliforniaActions.addTerminalOutput({ 
            output: `Command '${trimmedCommand}' not recognized. Type 'help' for available commands.` 
          });
        } else {
          return { type: 'NO_ACTION' }; // No-op for empty commands
        }
      })
    )
  );

  // Docker start effect - simulates starting containers
  startDockerDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.startDockerDemo),
      delay(300), // Simulate network delay
      switchMap(() =>
        this.CaliforniaDataService.startContainers().pipe(
          map((response: DockerResponse) => {
            if (response.success) {
              // Trigger health check after successful start
              timer(800).subscribe(() => {
                // This would normally be handled by another effect or service
                // For demo purposes, we'll dispatch the health check action
              });
              return CaliforniaActions.startDockerDemoSuccess({ response });
            } else {
              return CaliforniaActions.startDockerDemoFailure({ 
                error: response.message || 'Unknown error' 
              });
            }
          }),
          catchError(error => 
            of(CaliforniaActions.startDockerDemoFailure({ 
              error: `🏔️ Demo Error: ${error.message}` 
            }))
          )
        )
      )
    )
  );

  // Docker stop effect - simulates stopping containers
  stopDockerDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.stopDockerDemo),
      delay(250), // Simulate network delay
      switchMap(() =>
        this.CaliforniaDataService.stopContainers().pipe(
          map((response: DockerResponse) => {
            if (response.success) {
              return CaliforniaActions.stopDockerDemoSuccess({ response });
            } else {
              return CaliforniaActions.stopDockerDemoFailure({ 
                error: response.message || 'Unknown error' 
              });
            }
          }),
          catchError(error => 
            of(CaliforniaActions.stopDockerDemoFailure({ 
              error: `🏔️ Demo Error: ${error.message}` 
            }))
          )
        )
      )
    )
  );

  // Docker status check effect
  checkDockerStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.checkDockerStatus),
      delay(200), // Simulate network delay
      switchMap(() =>
        this.CaliforniaDataService.getContainerStatus().pipe(
          map((response: DockerResponse) => {
            if (response.success) {
              return CaliforniaActions.checkDockerStatusSuccess({ response });
            } else {
              return CaliforniaActions.checkDockerStatusFailure({ 
                error: response.message || 'No containers found or Docker not running.' 
              });
            }
          }),
          catchError(error => 
            of(CaliforniaActions.checkDockerStatusFailure({ 
              error: `🏔️ Demo Error: ${error.message}` 
            }))
          )
        )
      )
    )
  );

  // Application health check effect
  checkApplicationHealth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.checkApplicationHealth),
      delay(350), // Simulate health check delay
      switchMap(() =>
        this.CaliforniaDataService.checkApplicationHealth().pipe(
          map((response: DockerResponse & { applicationHtml?: any }) => {
            if (response.success) {
              return CaliforniaActions.checkApplicationHealthSuccess();
            } else {
              return CaliforniaActions.checkApplicationHealthFailure({ 
                error: 'Application not ready yet' 
              });
            }
          }),
          catchError(error => 
            of(CaliforniaActions.checkApplicationHealthFailure({ 
              error: `🏔️ Demo Error: ${error.message}` 
            }))
          )
        )
      )
    )
  );

  // Auto-trigger health check after successful container start
  autoHealthCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.startDockerDemoSuccess),
      delay(800), // Wait for containers to start
      map(() => CaliforniaActions.checkApplicationHealth())
    )
  );

  // Scroll terminal to bottom effect (side effect only)
  scrollTerminalToBottom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CaliforniaActions.addTerminalOutput,
        CaliforniaActions.startDockerDemoSuccess,
        CaliforniaActions.startDockerDemoFailure,
        CaliforniaActions.stopDockerDemoSuccess,
        CaliforniaActions.stopDockerDemoFailure,
        CaliforniaActions.checkDockerStatusSuccess,
        CaliforniaActions.checkDockerStatusFailure,
        CaliforniaActions.showDockerHelp,
        CaliforniaActions.clearTerminal
      ),
      tap(() => {
        // DOM manipulation for scrolling
        setTimeout(() => {
          const terminal = document.querySelector('.terminal-output');
          if (terminal) {
            terminal.scrollTop = terminal.scrollHeight;
          }
        }, 100);
      })
    ),
    { dispatch: false }
  );
} 