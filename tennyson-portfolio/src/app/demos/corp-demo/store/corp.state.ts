import { MessageLog, BoxConfig, WebhookRecord, SmsReceipt, corpView } from '../types/corp-demo.types';

export interface WebhookForm {
  url: string;
  level: 'controller' | 'organization';
  type: 'regular' | 'filtered';
  format: 'discord' | 'slack';
  controller: string;
}

export interface SMSForm {
  phoneNumber: string;
  toNumber: string;
  message: string;
}

export interface corpState {
  currentView: corpView;
  isFullscreen: boolean;
  selectedBox: string;
  selectedSlot: string;
  messageLogs: MessageLog[];
  boxes: BoxConfig[];
  webhooks: WebhookRecord[];
  relayEmail: string;
  showWebhookModal: boolean;
  showWebhookSuccessModal: boolean;
  createdWebhook: WebhookRecord | null;
  smsReceipt: SmsReceipt | null;
  startDate: string;
  endDate: string;
  fromNumberFilter: string;
  toNumberFilter: string;
  isSendingSMS: boolean;
  isCreatingWebhook: boolean;
  loadError: string | null;
  webhooksError: string | null;
  error: string | null;
}

export const initialcorpState: corpState = {
  currentView: corpView.SMS,
  isFullscreen: false,
  selectedBox: '',
  selectedSlot: '',
  messageLogs: [],
  boxes: [],
  webhooks: [],
  relayEmail: 'corp-test@example.com',
  showWebhookModal: false,
  showWebhookSuccessModal: false,
  createdWebhook: null,
  smsReceipt: null,
  startDate: '',
  endDate: '',
  fromNumberFilter: '',
  toNumberFilter: '',
  isSendingSMS: false,
  isCreatingWebhook: false,
  loadError: null,
  webhooksError: null,
  error: null
};
