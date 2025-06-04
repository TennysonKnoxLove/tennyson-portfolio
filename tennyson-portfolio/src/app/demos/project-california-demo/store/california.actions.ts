import { createAction, props } from '@ngrx/store';
import { DockerContainer, DockerResponse, CaliforniaView } from '../types/california-demo.types';
import { SafeHtml } from '@angular/platform-browser';

// View Actions
export const switchView = createAction(
  '[California] Switch View',
  props<{ view: CaliforniaView }>()
);

export const toggleFullscreen = createAction(
  '[California] Toggle Fullscreen'
);

// Terminal Actions
export const setTerminalInput = createAction(
  '[California] Set Terminal Input',
  props<{ input: string }>()
);

export const executeCommand = createAction(
  '[California] Execute Command',
  props<{ command: string }>()
);

export const addTerminalOutput = createAction(
  '[California] Add Terminal Output',
  props<{ output: string }>()
);

export const clearTerminal = createAction(
  '[California] Clear Terminal'
);

// Docker Actions (Demo)
export const startDockerDemo = createAction(
  '[California] Start Docker Demo'
);

export const startDockerDemoSuccess = createAction(
  '[California] Start Docker Demo Success',
  props<{ response: DockerResponse }>()
);

export const startDockerDemoFailure = createAction(
  '[California] Start Docker Demo Failure',
  props<{ error: string }>()
);

export const stopDockerDemo = createAction(
  '[California] Stop Docker Demo'
);

export const stopDockerDemoSuccess = createAction(
  '[California] Stop Docker Demo Success',
  props<{ response: DockerResponse }>()
);

export const stopDockerDemoFailure = createAction(
  '[California] Stop Docker Demo Failure',
  props<{ error: string }>()
);

export const checkDockerStatus = createAction(
  '[California] Check Docker Status'
);

export const checkDockerStatusSuccess = createAction(
  '[California] Check Docker Status Success',
  props<{ response: DockerResponse }>()
);

export const checkDockerStatusFailure = createAction(
  '[California] Check Docker Status Failure',
  props<{ error: string }>()
);

export const checkApplicationHealth = createAction(
  '[California] Check Application Health'
);

export const checkApplicationHealthSuccess = createAction(
  '[California] Check Application Health Success'
);

export const checkApplicationHealthFailure = createAction(
  '[California] Check Application Health Failure',
  props<{ error: string }>()
);

// Utility Actions
export const showDockerHelp = createAction(
  '[California] Show Docker Help'
);

export const scrollTerminalToBottom = createAction(
  '[California] Scroll Terminal To Bottom'
);

export const resetCaliforniaState = createAction(
  '[California] Reset State'
);

export const clearError = createAction(
  '[California] Clear Error'
); 