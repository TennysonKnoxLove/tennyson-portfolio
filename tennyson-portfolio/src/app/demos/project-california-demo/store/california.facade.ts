import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as CaliforniaActions from './california.actions';
import * as CaliforniaSelectors from './california.selectors';
import { CaliforniaView } from '../types/california-demo.types';

@Injectable({
  providedIn: 'root'
})
export class CaliforniaFacadeService {

  constructor(private store: Store) {}

  get viewModel$(): Observable<any> {
    return this.store.select(CaliforniaSelectors.selectCaliforniaViewModel);
  }

  get errorAlert$(): Observable<string> {
    return this.store.select(CaliforniaSelectors.selectError).pipe(
      filter((error): error is string => !!error)
    );
  }

  switchView(view: CaliforniaView): void {
    this.store.dispatch(CaliforniaActions.switchView({ view }));
  }

  toggleFullscreen(): void {
    this.store.dispatch(CaliforniaActions.toggleFullscreen());
  }

  executeCommand(command: string): void {
    this.store.dispatch(CaliforniaActions.executeCommand({ command }));
  }

  clearTerminal(): void {
    this.store.dispatch(CaliforniaActions.clearTerminal());
  }

  stopDockerDemo(): void {
    this.store.dispatch(CaliforniaActions.stopDockerDemo());
  }

  resetState(): void {
    this.store.dispatch(CaliforniaActions.resetCaliforniaState());
  }

  handleError(error: string): void {
    alert(error);
    this.store.dispatch(CaliforniaActions.clearError());
  }
}
