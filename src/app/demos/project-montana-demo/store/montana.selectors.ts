import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MontanaState } from './montana.state';

// Feature selector
export const selectMontanaState = createFeatureSelector<MontanaState>('montana');

// View selectors
export const selectCurrentView = createSelector(
  selectMontanaState,
  (state) => state.currentView
);

export const selectIsFullscreen = createSelector(
  selectMontanaState,
  (state) => state.isFullscreen
);

// Docker selectors
export const selectDockerContainers = createSelector(
  selectMontanaState,
  (state) => state.dockerContainers
);

export const selectDockerRunning = createSelector(
  selectMontanaState,
  (state) => state.dockerRunning
);

export const selectApplicationUrl = createSelector(
  selectMontanaState,
  (state) => state.applicationUrl
);

// Terminal selectors
export const selectTerminalInput = createSelector(
  selectMontanaState,
  (state) => state.terminalInput
);

export const selectTerminalOutput = createSelector(
  selectMontanaState,
  (state) => state.terminalOutput
);

// Loading selectors
export const selectIsExecutingCommand = createSelector(
  selectMontanaState,
  (state) => state.isExecutingCommand
);

export const selectIsCheckingStatus = createSelector(
  selectMontanaState,
  (state) => state.isCheckingStatus
);

export const selectIsCheckingHealth = createSelector(
  selectMontanaState,
  (state) => state.isCheckingHealth
);

// Error selector
export const selectError = createSelector(
  selectMontanaState,
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
export const selectMontanaViewModel = createSelector(
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