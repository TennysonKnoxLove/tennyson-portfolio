export interface MessageLog {
  timestamp: string;
  loggedAt: string;
  from: string;
  to: string;
  modemId: string;
  message: string;
  boxId: string;
}

export interface SlotConfig {
  id: string;
  name: string;
  phoneNumbers: string[];
}

export interface BoxConfig {
  id: string;
  name: string;
  slots: SlotConfig[];
}

export interface WebhookRecord {
  id: string;
  url: string;
  level: 'controller' | 'organization';
  type: 'regular' | 'filtered';
  format: 'discord' | 'slack';
  controller: string;
  createdAt: string;
}

export interface SmsReceipt {
  from: string;
  to: string;
  message: string;
  boxName: string;
  slotName: string;
  note: string;
}

export enum corpView {
  SMS = 'SMS',
  MESSAGE_LOG = 'Message Log',
  INFORMATION = 'Information',
  WEBHOOKS = 'Webhooks'
} 