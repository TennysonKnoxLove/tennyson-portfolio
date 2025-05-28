import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { map, delay, catchError, switchMap, tap } from 'rxjs/operators';
import * as MontanaActions from './montana.actions';
import { MontanaDataService } from '../services/montana-data.service';
import { DockerResponse } from '../types/montana-demo.types';

@Injectable()
export class MontanaEffects {
  private actions$ = inject(Actions);
  private montanaDataService = inject(MontanaDataService);

  // Command execution effect - routes commands to appropriate actions
  executeCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MontanaActions.executeCommand),
      map(({ command }) => {
        const trimmedCommand = command.trim();
        
        if (trimmedCommand === 'docker-compose up' || trimmedCommand === 'docker-compose up -d') {
          return MontanaActions.startDockerDemo();
        } else if (trimmedCommand === 'docker-compose down') {
          return MontanaActions.stopDockerDemo();
        } else if (trimmedCommand === 'docker ps') {
          return MontanaActions.checkDockerStatus();
        } else if (trimmedCommand === 'clear') {
          return MontanaActions.clearTerminal();
        } else if (trimmedCommand === 'help') {
          return MontanaActions.showDockerHelp();
        } else if (trimmedCommand !== '') {
          return MontanaActions.addTerminalOutput({ 
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
      ofType(MontanaActions.startDockerDemo),
      delay(1000), // Simulate network delay
      switchMap(() =>
        this.montanaDataService.startContainers().pipe(
          map((response: DockerResponse) => {
            if (response.success) {
              // Trigger health check after successful start
              timer(3000).subscribe(() => {
                // This would normally be handled by another effect or service
                // For demo purposes, we'll dispatch the health check action
              });
              return MontanaActions.startDockerDemoSuccess({ response });
            } else {
              return MontanaActions.startDockerDemoFailure({ 
                error: response.message || 'Unknown error' 
              });
            }
          }),
          catchError(error => 
            of(MontanaActions.startDockerDemoFailure({ 
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
      ofType(MontanaActions.stopDockerDemo),
      delay(800), // Simulate network delay
      switchMap(() =>
        this.montanaDataService.stopContainers().pipe(
          map((response: DockerResponse) => {
            if (response.success) {
              return MontanaActions.stopDockerDemoSuccess({ response });
            } else {
              return MontanaActions.stopDockerDemoFailure({ 
                error: response.message || 'Unknown error' 
              });
            }
          }),
          catchError(error => 
            of(MontanaActions.stopDockerDemoFailure({ 
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
      ofType(MontanaActions.checkDockerStatus),
      delay(500), // Simulate network delay
      switchMap(() =>
        this.montanaDataService.getContainerStatus().pipe(
          map((response: DockerResponse) => {
            if (response.success) {
              return MontanaActions.checkDockerStatusSuccess({ response });
            } else {
              return MontanaActions.checkDockerStatusFailure({ 
                error: response.message || 'No containers found or Docker not running.' 
              });
            }
          }),
          catchError(error => 
            of(MontanaActions.checkDockerStatusFailure({ 
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
      ofType(MontanaActions.checkApplicationHealth),
      delay(1000), // Simulate health check delay
      switchMap(() =>
        this.montanaDataService.checkApplicationHealth().pipe(
          map((response: DockerResponse & { applicationUrl?: any }) => {
            if (response.success && response.applicationUrl) {
              return MontanaActions.checkApplicationHealthSuccess({ 
                applicationUrl: response.applicationUrl 
              });
            } else {
              return MontanaActions.checkApplicationHealthFailure({ 
                error: 'Application not ready yet' 
              });
            }
          }),
          catchError(error => 
            of(MontanaActions.checkApplicationHealthFailure({ 
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
      ofType(MontanaActions.startDockerDemoSuccess),
      delay(3000), // Wait for containers to start
      map(() => MontanaActions.checkApplicationHealth())
    )
  );

  // Scroll terminal to bottom effect (side effect only)
  scrollTerminalToBottom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MontanaActions.addTerminalOutput,
        MontanaActions.startDockerDemoSuccess,
        MontanaActions.startDockerDemoFailure,
        MontanaActions.stopDockerDemoSuccess,
        MontanaActions.stopDockerDemoFailure,
        MontanaActions.checkDockerStatusSuccess,
        MontanaActions.checkDockerStatusFailure,
        MontanaActions.showDockerHelp,
        MontanaActions.clearTerminal
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