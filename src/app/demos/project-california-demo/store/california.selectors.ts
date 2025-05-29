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

export const selectApplicationUrl = createSelector(
  selectCaliforniaState,
  (state) => state.applicationUrl
);

// Terminal selectors
export const selectTerminalInput = createSelector(
  selectCaliforniaState,
  (state) => state.terminalInput
);

export const selectTerminalOutput = createSelector(
  selectCaliforniaState,
  (state) => state.terminalOutput
);

// Loading selectors
export const selectIsExecutingCommand = createSelector(
  selectCaliforniaState,
  (state) => state.isExecutingCommand
);

export const selectIsCheckingStatus = createSelector(
  selectCaliforniaState,
  (state) => state.isCheckingStatus
);

export const selectIsCheckingHealth = createSelector(
  selectCaliforniaState,
  (state) => state.isCheckingHealth
);

// Error selector
export const selectError = createSelector(
  selectCaliforniaState,
  (state) => state.error
);

// Computed selectors
export const selectIsApplicationReady = createSelector(
  selectDockerRunning,
  selectApplicationUrl,
  (dockerRunning, applicationUrl) => dockerRunning && applicationUrl !== null
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
  selectApplicationUrl,
  selectTerminalInput,
  selectTerminalOutput,
  selectIsExecutingCommand,
  selectIsCheckingStatus,
  selectIsCheckingHealth,
  selectError,
  selectIsApplicationReady,
  selectRunningContainerCount,
  (
    currentView,
    isFullscreen,
    dockerContainers,
    dockerRunning,
    applicationUrl,
    terminalInput,
    terminalOutput,
    isExecutingCommand,
    isCheckingStatus,
    isCheckingHealth,
    error,
    isApplicationReady,
    runningContainerCount
  ) => ({
    currentView,
    isFullscreen,
    dockerContainers,
    dockerRunning,
    applicationUrl,
    terminalInput,
    terminalOutput,
    isExecutingCommand,
    isCheckingStatus,
    isCheckingHealth,
    error,
    isApplicationReady,
    runningContainerCount
  })
); 