import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, delay, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as CaliforniaActions from './california.actions';
import { CaliforniaDataService } from '../services/california-data.service';
import { DockerContainer, DockerResponse } from '../types/california-demo.types';
import { selectDockerContainers, selectDockerRunning } from './california.selectors';

const COMPOSE_UP_COMMANDS = new Set([
  'docker-compose up',
  'docker-compose up -d',
  'docker compose up',
  'docker compose up -d'
]);

const COMPOSE_DOWN_COMMANDS = new Set([
  'docker-compose down',
  'docker compose down'
]);

@Injectable()
export class CaliforniaEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private CaliforniaDataService = inject(CaliforniaDataService);

  // Command execution effect - routes commands to appropriate actions
  executeCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.executeCommand),
      withLatestFrom(this.store.select(selectDockerRunning)),
      map(([{ command }, dockerRunning]) => {
        const trimmedCommand = command.trim().replace(/\s+/g, ' ');

        if (COMPOSE_UP_COMMANDS.has(trimmedCommand)) {
          return CaliforniaActions.startDockerDemo();
        } else if (COMPOSE_DOWN_COMMANDS.has(trimmedCommand)) {
          if (!dockerRunning) {
            return CaliforniaActions.addTerminalOutput({
              output: 'No containers are running. Nothing to stop.'
            });
          }
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

  // Docker status check effect — read-only. Reports the containers already in state.
  checkDockerStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.checkDockerStatus),
      delay(200),
      withLatestFrom(this.store.select(selectDockerContainers)),
      map(([, containers]) => {
        const response: DockerResponse = {
          success: true,
          message: 'Status check completed',
          output: formatDockerPs(containers),
          containers
        };
        return CaliforniaActions.checkDockerStatusSuccess({ response });
      })
    )
  );

  // Application health check effect
  checkApplicationHealth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CaliforniaActions.checkApplicationHealth),
      delay(350), // Simulate health check delay
      switchMap(() =>
        this.CaliforniaDataService.checkApplicationHealth().pipe(
          map((response: DockerResponse) => {
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

function formatDockerPs(containers: DockerContainer[]): string {
  const rows = containers.map((container) => {
    const image = container.name === 'california-db' ? 'postgres:13' : `${container.name}:latest`;
    const command = container.name === 'california-web'
      ? '"npm start"'
      : container.name === 'california-api'
        ? '"python app.py"'
        : '"docker-entrypoint..."';
    const id = container.name === 'california-web'
      ? 'abc123def456'
      : container.name === 'california-api'
        ? 'def456ghi789'
        : 'ghi789jkl012';

    if (container.status === 'running') {
      const uptime = container.uptime || 'a few seconds';
      const ports = container.ports.map((port) => `0.0.0.0:${port}`).join(', ');
      return `${id}   ${image}   ${command}   Up ${uptime}   ${ports}   ${container.name}`;
    }

    const statusLabel = container.status === 'starting'
      ? 'Starting'
      : container.status === 'error'
        ? 'Error'
        : 'Exited';
    return `${id}   ${image}   ${command}   ${statusLabel}   ${container.name}`;
  });

  if (!containers.some((container) => container.status === 'running')) {
    rows.push('No containers are running.');
  }

  return rows.join('\n');
} 