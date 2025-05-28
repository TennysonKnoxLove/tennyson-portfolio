import { createAction, props } from '@ngrx/store';
import { DockerContainer, DockerResponse, MontanaView } from '../types/montana-demo.types';
import { SafeResourceUrl } from '@angular/platform-browser';

// View Actions
export const switchView = createAction(
  '[Montana] Switch View',
  props<{ view: MontanaView }>()
);

export const toggleFullscreen = createAction(
  '[Montana] Toggle Fullscreen'
);

// Terminal Actions
export const setTerminalInput = createAction(
  '[Montana] Set Terminal Input',
  props<{ input: string }>()
);

export const executeCommand = createAction(
  '[Montana] Execute Command',
  props<{ command: string }>()
);

export const addTerminalOutput = createAction(
  '[Montana] Add Terminal Output',
  props<{ output: string }>()
);

export const clearTerminal = createAction(
  '[Montana] Clear Terminal'
);

// Docker Actions (Demo)
export const startDockerDemo = createAction(
  '[Montana] Start Docker Demo'
);

export const startDockerDemoSuccess = createAction(
  '[Montana] Start Docker Demo Success',
  props<{ response: DockerResponse }>()
);

export const startDockerDemoFailure = createAction(
  '[Montana] Start Docker Demo Failure',
  props<{ error: string }>()
);

export const stopDockerDemo = createAction(
  '[Montana] Stop Docker Demo'
);

export const stopDockerDemoSuccess = createAction(
  '[Montana] Stop Docker Demo Success',
  props<{ response: DockerResponse }>()
);

export const stopDockerDemoFailure = createAction(
  '[Montana] Stop Docker Demo Failure',
  props<{ error: string }>()
);

export const checkDockerStatus = createAction(
  '[Montana] Check Docker Status'
);

export const checkDockerStatusSuccess = createAction(
  '[Montana] Check Docker Status Success',
  props<{ response: DockerResponse }>()
);

export const checkDockerStatusFailure = createAction(
  '[Montana] Check Docker Status Failure',
  props<{ error: string }>()
);

export const checkApplicationHealth = createAction(
  '[Montana] Check Application Health'
);

export const checkApplicationHealthSuccess = createAction(
  '[Montana] Check Application Health Success',
  props<{ applicationUrl: SafeResourceUrl }>()
);

export const checkApplicationHealthFailure = createAction(
  '[Montana] Check Application Health Failure',
  props<{ error: string }>()
);

// Utility Actions
export const showDockerHelp = createAction(
  '[Montana] Show Docker Help'
);

export const scrollTerminalToBottom = createAction(
  '[Montana] Scroll Terminal To Bottom'
);

export const resetMontanaState = createAction(
  '[Montana] Reset State'
);

export const clearError = createAction(
  '[Montana] Clear Error'
); 