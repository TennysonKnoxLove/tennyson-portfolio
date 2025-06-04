import { createReducer, on } from '@ngrx/store';
import { CaliforniaState, initialCaliforniaState } from './california.state';
import * as CaliforniaActions from './california.actions';
import { CaliforniaView } from '../types/california-demo.types';

export const CaliforniaReducer = createReducer(
  initialCaliforniaState,

  // View Actions
  on(CaliforniaActions.switchView, (state, { view }) => ({
    ...state,
    currentView: view
  })),

  on(CaliforniaActions.toggleFullscreen, (state) => ({
    ...state,
    isFullscreen: !state.isFullscreen
  })),

  // Terminal Actions
  on(CaliforniaActions.setTerminalInput, (state, { input }) => ({
    ...state,
    terminalInput: input
  })),

  on(CaliforniaActions.executeCommand, (state, { command }) => ({
    ...state,
    terminalInput: '',
    terminalOutput: [...state.terminalOutput, `$ ${command}`]
  })),

  on(CaliforniaActions.addTerminalOutput, (state, { output }) => ({
    ...state,
    terminalOutput: [...state.terminalOutput, output]
  })),

  on(CaliforniaActions.clearTerminal, (state) => ({
    ...state,
    terminalOutput: ['🏔️  Project California Docker Environment (Demo)', '$ ']
  })),

  // Docker Actions (Demo)
  on(CaliforniaActions.startDockerDemo, (state) => ({
    ...state,
    isExecutingCommand: true,
    error: null
  })),

  on(CaliforniaActions.startDockerDemoSuccess, (state, { response }) => ({
    ...state,
    isExecutingCommand: false,
    dockerRunning: true,
    dockerContainers: response.containers,
    terminalOutput: [
      ...state.terminalOutput,
      '🚀 Starting Project California containers...',
      '✅ Containers started successfully!',
      '📦 Building frontend and backend containers...',
      ...(response.output ? response.output.split('\n').filter(line => line.trim()) : []),
      '$ '
    ],
    error: null
  })),

  on(CaliforniaActions.startDockerDemoFailure, (state, { error }) => ({
    ...state,
    isExecutingCommand: false,
    terminalOutput: [
      ...state.terminalOutput,
      `❌ Failed to start containers: ${error}`,
      '$ '
    ],
    error
  })),

  on(CaliforniaActions.stopDockerDemo, (state) => ({
    ...state,
    isExecutingCommand: true,
    error: null
  })),

  on(CaliforniaActions.stopDockerDemoSuccess, (state, { response }) => ({
    ...state,
    isExecutingCommand: false,
    dockerRunning: false,
    applicationHtml: null,
    healthCheckPassed: false,
    dockerContainers: state.dockerContainers.map(container => ({
      ...container,
      status: 'stopped' as const,
      uptime: undefined
    })),
    terminalOutput: [
      ...state.terminalOutput,
      '🛑 Stopping Project California containers...',
      '✅ All containers stopped successfully.',
      ...(response.output ? response.output.split('\n').filter(line => line.trim()) : []),
      '$ '
    ],
    error: null
  })),

  on(CaliforniaActions.stopDockerDemoFailure, (state, { error }) => ({
    ...state,
    isExecutingCommand: false,
    terminalOutput: [
      ...state.terminalOutput,
      `❌ Failed to stop containers: ${error}`,
      '$ '
    ],
    error
  })),

  on(CaliforniaActions.checkDockerStatus, (state) => ({
    ...state,
    isCheckingStatus: true
  })),

  on(CaliforniaActions.checkDockerStatusSuccess, (state, { response }) => ({
    ...state,
    isCheckingStatus: false,
    dockerContainers: response.containers,
    dockerRunning: response.containers.some(c => c.status === 'running'),
    terminalOutput: [
      ...state.terminalOutput,
      '📊 Checking container status...',
      'CONTAINER ID   IMAGE                     COMMAND                  CREATED        STATUS        PORTS                    NAMES',
      ...(response.output ? response.output.split('\n').filter(line => line.trim()) : []),
      '$ '
    ]
  })),

  on(CaliforniaActions.checkDockerStatusFailure, (state, { error }) => ({
    ...state,
    isCheckingStatus: false,
    terminalOutput: [
      ...state.terminalOutput,
      `❌ Error checking status: ${error}`,
      '$ '
    ],
    error
  })),

  on(CaliforniaActions.checkApplicationHealth, (state) => ({
    ...state,
    isCheckingHealth: true
  })),

  on(CaliforniaActions.checkApplicationHealthSuccess, (state) => ({
    ...state,
    isCheckingHealth: false,
    applicationHtml: null,
    healthCheckPassed: true,
    terminalOutput: [
      ...state.terminalOutput,
      '🌐 Application is ready! Switch to Application tab to view.'
    ]
  })),

  on(CaliforniaActions.checkApplicationHealthFailure, (state, { error }) => ({
    ...state,
    isCheckingHealth: false,
    healthCheckPassed: false,
    terminalOutput: [
      ...state.terminalOutput,
      '⚠️  Application health check failed. Retrying...'
    ],
    error
  })),

  on(CaliforniaActions.showDockerHelp, (state) => ({
    ...state,
    terminalOutput: [
      ...state.terminalOutput,
      'Available commands:',
      '  docker-compose up    - Start all containers',
      '  docker-compose down  - Stop all containers',
      '  docker ps           - Show container status',
      '  clear               - Clear terminal',
      '  help                - Show this help',
      ''
    ]
  })),

  // Reset Actions
  on(CaliforniaActions.resetCaliforniaState, () => ({
    ...initialCaliforniaState
  })),

  on(CaliforniaActions.clearError, (state) => ({
    ...state,
    error: null
  }))
); 