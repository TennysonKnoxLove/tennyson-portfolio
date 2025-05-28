import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as MontanaActions from './montana.actions';
import * as MontanaSelectors from './montana.selectors';
import { MontanaView, DockerContainer } from '../types/montana-demo.types';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MontanaFacadeService {

  constructor(private store: Store) {}

  // Selectors - Expose observables for components
  get viewModel$(): Observable<any> {
    return this.store.select(MontanaSelectors.selectMontanaViewModel);
  }

  get dockerContainers$(): Observable<DockerContainer[]> {
    return this.store.select(MontanaSelectors.selectDockerContainers);
  }

  get terminalOutput$(): Observable<string[]> {
    return this.store.select(MontanaSelectors.selectTerminalOutput);
  }

  get error$(): Observable<string | null> {
    return this.store.select(MontanaSelectors.selectError);
  }

  get isExecutingCommand$(): Observable<boolean> {
    return this.store.select(MontanaSelectors.selectIsExecutingCommand);
  }

  get isApplicationReady$(): Observable<boolean> {
    return this.store.select(MontanaSelectors.selectIsApplicationReady);
  }

  get runningContainerCount$(): Observable<number> {
    return this.store.select(MontanaSelectors.selectRunningContainerCount);
  }

  // Error handling for components
  get errorAlert$(): Observable<string> {
    return this.error$.pipe(
      filter(error => !!error),
      map(error => error!)
    );
  }

  // View Management
  switchView(view: MontanaView): void {
    this.store.dispatch(MontanaActions.switchView({ view }));
  }

  toggleFullscreen(): void {
    this.store.dispatch(MontanaActions.toggleFullscreen());
  }

  // Terminal Operations
  setTerminalInput(input: string): void {
    this.store.dispatch(MontanaActions.setTerminalInput({ input }));
  }

  executeCommand(command: string): void {
    this.store.dispatch(MontanaActions.executeCommand({ command }));
  }

  clearTerminal(): void {
    this.store.dispatch(MontanaActions.clearTerminal());
  }

  // Docker Operations (Demo)
  startDockerDemo(): void {
    this.store.dispatch(MontanaActions.startDockerDemo());
  }

  stopDockerDemo(): void {
    this.store.dispatch(MontanaActions.stopDockerDemo());
  }

  checkDockerStatus(): void {
    this.store.dispatch(MontanaActions.checkDockerStatus());
  }

  checkApplicationHealth(): void {
    this.store.dispatch(MontanaActions.checkApplicationHealth());
  }

  showDockerHelp(): void {
    this.store.dispatch(MontanaActions.showDockerHelp());
  }

  // Utility Operations
  clearError(): void {
    this.store.dispatch(MontanaActions.clearError());
  }

  resetState(): void {
    this.store.dispatch(MontanaActions.resetMontanaState());
  }

  scrollTerminalToBottom(): void {
    this.store.dispatch(MontanaActions.scrollTerminalToBottom());
  }

  // Helper methods for component convenience
  handleError(error: string): void {
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