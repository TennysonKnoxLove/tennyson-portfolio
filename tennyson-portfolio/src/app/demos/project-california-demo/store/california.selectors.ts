import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CaliforniaState } from './california.state';

// Feature selector
export const selectCaliforniaState = createFeatureSelector<CaliforniaState>('california');

// View selectors
export const selectCurrentView = createSelector(
  selectCaliforniaState,
  (state) => state.currentView
);

export const selectIsFullscreen = createSelector(
  selectCaliforniaState,
  (state) => state.isFullscreen
);

// Docker selectors
export const selectDockerContainers = createSelector(
  selectCaliforniaState,
  (state) => state.dockerContainers
);

export const selectDockerRunning = createSelector(
  selectCaliforniaState,
  (state) => state.dockerRunning
);

export const selectHealthCheckPassed = createSelector(
  selectCaliforniaState,
  (state) => state.healthCheckPassed
);

// Terminal selectors
export const selectTerminalOutput = createSelector(
  selectCaliforniaState,
  (state) => state.terminalOutput
);

// Loading selectors
export const selectIsExecutingCommand = createSelector(
  selectCaliforniaState,
  (state) => state.isExecutingCommand
);

// Error selector
export const selectError = createSelector(
  selectCaliforniaState,
  (state) => state.error
);

// Computed selectors
export const selectIsApplicationReady = createSelector(
  selectDockerRunning,
  selectHealthCheckPassed,
  (dockerRunning, healthCheckPassed) => dockerRunning && healthCheckPassed
);

export const selectRunningContainerCount = createSelector(
  selectDockerContainers,
  (containers) => containers.filter(c => c.status === 'running').length
);

// Combined selectors for component convenience
export const selectCaliforniaViewModel = createSelector(
  selectCurrentView,
  selectIsFullscreen,
  selectDockerContainers,
  selectDockerRunning,
  selectTerminalOutput,
  selectIsExecutingCommand,
  selectIsApplicationReady,
  selectRunningContainerCount,
  (
    currentView,
    isFullscreen,
    dockerContainers,
    dockerRunning,
    terminalOutput,
    isExecutingCommand,
    isApplicationReady,
    runningContainerCount
  ) => ({
    currentView,
    isFullscreen,
    dockerContainers,
    dockerRunning,
    terminalOutput,
    isExecutingCommand,
    isApplicationReady,
    runningContainerCount
  })
);
