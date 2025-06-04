import { DockerContainer, CaliforniaView } from '../types/california-demo.types';
import { SafeHtml } from '@angular/platform-browser';

export interface CaliforniaState {
  // View state
  currentView: CaliforniaView;
  isFullscreen: boolean;
  
  // Docker state
  dockerContainers: DockerContainer[];
  dockerRunning: boolean;
  applicationHtml: SafeHtml | null;
  healthCheckPassed: boolean;
  
  // Terminal state
  terminalInput: string;
  terminalOutput: string[];
  
  // Loading states
  isExecutingCommand: boolean;
  isCheckingStatus: boolean;
  isCheckingHealth: boolean;
  
  // Error state
  error: string | null;
}

export const initialCaliforniaState: CaliforniaState = {
  currentView: CaliforniaView.TERMINAL,
  isFullscreen: false,
  dockerContainers: [
    { name: 'california-web', status: 'stopped', ports: ['3000:3000'] },
    { name: 'california-api', status: 'stopped', ports: ['8000:8000'] },
    { name: 'california-db', status: 'stopped', ports: ['5432:5432'] }
  ],
  dockerRunning: false,
  applicationHtml: null,
  healthCheckPassed: false,
  terminalInput: '',
  terminalOutput: [
    '🌴  Project California Docker Environment (Demo)',
    'Type "docker-compose up" to start the application stack',
    '$ '
  ],
  isExecutingCommand: false,
  isCheckingStatus: false,
  isCheckingHealth: false,
  error: null
}; 