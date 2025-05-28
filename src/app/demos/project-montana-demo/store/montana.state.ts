import { DockerContainer, MontanaView } from '../types/montana-demo.types';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface MontanaState {
  // View state
  currentView: MontanaView;
  isFullscreen: boolean;
  
  // Docker state
  dockerContainers: DockerContainer[];
  dockerRunning: boolean;
  applicationUrl: SafeResourceUrl | null;
  
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

export const initialMontanaState: MontanaState = {
  currentView: MontanaView.TERMINAL,
  isFullscreen: false,
  dockerContainers: [
    { name: 'montana-web', status: 'stopped', ports: ['3000:3000'] },
    { name: 'montana-api', status: 'stopped', ports: ['8000:8000'] },
    { name: 'montana-db', status: 'stopped', ports: ['5432:5432'] }
  ],
  dockerRunning: false,
  applicationUrl: null,
  terminalInput: '',
  terminalOutput: [
    '🏔️  Project Montana Docker Environment (Demo)',
    'Type "docker-compose up" to start the application stack',
    '$ '
  ],
  isExecutingCommand: false,
  isCheckingStatus: false,
  isCheckingHealth: false,
  error: null
}; 