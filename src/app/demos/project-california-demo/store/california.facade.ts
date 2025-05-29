import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as CaliforniaActions from './california.actions';
import * as CaliforniaSelectors from './california.selectors';
import { CaliforniaView, DockerContainer } from '../types/california-demo.types';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CaliforniaFacadeService {

  constructor(private store: Store) {}

  // Selectors - Expose observables for components
  get viewModel$(): Observable<any> {
    return this.store.select(CaliforniaSelectors.selectCaliforniaViewModel);
  }

  get dockerContainers$(): Observable<DockerContainer[]> {
    return this.store.select(CaliforniaSelectors.selectDockerContainers);
  }

  get terminalOutput$(): Observable<string[]> {
    return this.store.select(CaliforniaSelectors.selectTerminalOutput);
  }

  get error$(): Observable<string | null> {
    return this.store.select(CaliforniaSelectors.selectError);
  }

  get isExecutingCommand$(): Observable<boolean> {
    return this.store.select(CaliforniaSelectors.selectIsExecutingCommand);
  }

  get isApplicationReady$(): Observable<boolean> {
    return this.store.select(CaliforniaSelectors.selectIsApplicationReady);
  }

  get runningContainerCount$(): Observable<number> {
    return this.store.select(CaliforniaSelectors.selectRunningContainerCount);
  }

  // Error handling for components
  get errorAlert$(): Observable<string> {
    return this.error$.pipe(
      filter(error => !!error),
      map(error => error!)
    );
  }

  // View Management
  switchView(view: CaliforniaView): void {
    this.store.dispatch(CaliforniaActions.switchView({ view }));
  }

  toggleFullscreen(): void {
    this.store.dispatch(CaliforniaActions.toggleFullscreen());
  }

  // Terminal Operations
  setTerminalInput(input: string): void {
    this.store.dispatch(CaliforniaActions.setTerminalInput({ input }));
  }

  executeCommand(command: string): void {
    this.store.dispatch(CaliforniaActions.executeCommand({ command }));
  }

  clearTerminal(): void {
    this.store.dispatch(CaliforniaActions.clearTerminal());
  }

  // Docker Operations (Demo)
  startDockerDemo(): void {
    this.store.dispatch(CaliforniaActions.startDockerDemo());
  }

  stopDockerDemo(): void {
    this.store.dispatch(CaliforniaActions.stopDockerDemo());
  }

  checkDockerStatus(): void {
    this.store.dispatch(CaliforniaActions.checkDockerStatus());
  }

  checkApplicationHealth(): void {
    this.store.dispatch(CaliforniaActions.checkApplicationHealth());
  }

  showDockerHelp(): void {
    this.store.dispatch(CaliforniaActions.showDockerHelp());
  }

  // Utility Operations
  clearError(): void {
    this.store.dispatch(CaliforniaActions.clearError());
  }

  resetState(): void {
    this.store.dispatch(CaliforniaActions.resetCaliforniaState());
  }

  scrollTerminalToBottom(): void {
    this.store.dispatch(CaliforniaActions.scrollTerminalToBottom());
  }

  // Helper methods for component convenience
  handleError(error: any): void {
    alert(error);
    this.clearError();
  }

  // Business logic for terminal commands
  getAvailableCommands(): string[] {
    return [
      'docker-compose up',
      'docker-compose down', 
      'docker ps',
      'clear',
      'help'
    ];
  }

  isValidCommand(command: string): boolean {
    const trimmedCommand = command.trim();
    return this.getAvailableCommands().includes(trimmedCommand) || trimmedCommand === '';
  }

  // Container status helpers
  getContainerStatusColor(status: string): string {
    switch (status) {
      case 'running': return 'green';
      case 'stopped': return 'red';
      case 'starting': return 'orange';
      case 'error': return 'red';
      default: return 'gray';
    }
  }

  getContainerStatusIcon(status: string): string {
    switch (status) {
      case 'running': return '';
      case 'stopped': return '';
      case 'starting': return '';
      case 'error': return '';
      default: return '';
    }
  }
} 