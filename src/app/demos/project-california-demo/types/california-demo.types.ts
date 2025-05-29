export interface DockerContainer {
  name: string;
  status: 'running' | 'stopped' | 'starting' | 'error';
  ports: string[];
  uptime?: string;
}

export interface DockerResponse {
  success: boolean;
  message: string;
  output: string;
  containers: DockerContainer[];
}

export enum CaliforniaView {
  TERMINAL = 'Terminal',
  APPLICATION = 'Application'
} 