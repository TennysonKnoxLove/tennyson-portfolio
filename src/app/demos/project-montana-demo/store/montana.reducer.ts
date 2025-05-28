import { createReducer, on } from '@ngrx/store';
import { MontanaState, initialMontanaState } from './montana.state';
import * as MontanaActions from './montana.actions';
import { MontanaView } from '../types/montana-demo.types';

export const montanaReducer = createReducer(
  initialMontanaState,

  // View Actions
  on(MontanaActions.switchView, (state, { view }) => ({
    ...state,
    currentView: view
  })),

  on(MontanaActions.toggleFullscreen, (state) => ({
    ...state,
    isFullscreen: !state.isFullscreen
  })),

  // Terminal Actions
  on(MontanaActions.setTerminalInput, (state, { input }) => ({
    ...state,
    terminalInput: input
  })),

  on(MontanaActions.executeCommand, (state, { command }) => ({
    ...state,
    terminalInput: '',
    terminalOutput: [...state.terminalOutput, `$ ${command}`]
  })),

  on(MontanaActions.addTerminalOutput, (state, { output }) => ({
    ...state,
    terminalOutput: [...state.terminalOutput, output]
  })),

  on(MontanaActions.clearTerminal, (state) => ({
    ...state,
    terminalOutput: ['🏔️  Project Montana Docker Environment (Demo)', '$ ']
  })),

  // Docker Actions (Demo)
  on(MontanaActions.startDockerDemo, (state) => ({
    ...state,
    isExecutingCommand: true,
    error: null
  })),

  on(MontanaActions.startDockerDemoSuccess, (state, { response }) => ({
    ...state,
    isExecutingCommand: false,
    dockerRunning: true,
    dockerContainers: response.containers,
    terminalOutput: [
      ...state.terminalOutput,
      '🚀 Starting Project Montana containers...',
      '✅ Containers started successfully!',
      '📦 Building frontend and backend containers...',
      ...(response.output ? response.output.split('\n').filter(line => line.trim()) : []),
      '$ '
    ],
    error: null
  })),

  on(MontanaActions.startDockerDemoFailure, (state, { error }) => ({
    ...state,
    isExecutingCommand: false,
    terminalOutput: [
      ...state.terminalOutput,
      `❌ Failed to start containers: ${error}`,
      '$ '
    ],
    error
  })),

  on(MontanaActions.stopDockerDemo, (state) => ({
    ...state,
    isExecutingCommand: true,
    error: null
  })),

  on(MontanaActions.stopDockerDemoSuccess, (state, { response }) => ({
    ...state,
    isExecutingCommand: false,
    dockerRunning: false,
    applicationUrl: null,
    dockerContainers: state.dockerContainers.map(container => ({
      ...container,
      status: 'stopped' as const,
      uptime: undefined
    })),
    terminalOutput: [
      ...state.terminalOutput,
      '🛑 Stopping Project Montana containers...',
      '✅ All containers stopped successfully.',
      ...(response.output ? response.output.split('\n').filter(line => line.trim()) : []),
      '$ '
    ],
    error: null
  })),

  on(MontanaActions.stopDockerDemoFailure, (state, { error }) => ({
    ...state,
    isExecutingCommand: false,
    terminalOutput: [
      ...state.terminalOutput,
      `❌ Failed to stop containers: ${error}`,
      '$ '
    ],
    error
  })),

  on(MontanaActions.checkDockerStatus, (state) => ({
    ...state,
    isCheckingStatus: true
  })),

  on(MontanaActions.checkDockerStatusSuccess, (state, { response }) => ({
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

  on(MontanaActions.checkDockerStatusFailure, (state, { error }) => ({
    ...state,
    isCheckingStatus: false,
    terminalOutput: [
      ...state.terminalOutput,
      `❌ Error checking status: ${error}`,
      '$ '
    ],
    error
  })),

  on(MontanaActions.checkApplicationHealth, (state) => ({
    ...state,
    isCheckingHealth: true
  })),

  on(MontanaActions.checkApplicationHealthSuccess, (state, { applicationUrl }) => ({
    ...state,
    isCheckingHealth: false,
    applicationUrl,
    terminalOutput: [
      ...state.terminalOutput,
      '🌐 Application is ready! Switch to Application tab to view.'
    ]
  })),

  on(MontanaActions.checkApplicationHealthFailure, (state, { error }) => ({
    ...state,
    isCheckingHealth: false,
    terminalOutput: [
      ...state.terminalOutput,
      '⚠️  Application health check failed. Retrying...'
    ],
    error
  })),

  on(MontanaActions.showDockerHelp, (state) => ({
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
  on(MontanaActions.resetMontanaState, () => ({
    ...initialMontanaState
  })),

  on(MontanaActions.clearError, (state) => ({
    ...state,
    error: null
  }))
); 