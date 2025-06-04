export interface MessageLog {
  timestamp: string;
  from: string;
  to: string;
  modemId: string;
  message: string;
}

export interface BoxConfig {
  id: string;
  name: string;
}

export enum corpView {
  SMS = 'SMS',
  MESSAGE_LOG = 'Message Log',
  INFORMATION = 'Information',
  WEBHOOKS = 'Webhooks'
} 