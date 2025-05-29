import { MessageLog, BoxConfig, corpView } from '../types/corp-demo.types';

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
  // View state
  currentView: corpView;
  isFullscreen: boolean;
  
  // Selection state
  selectedBox: string;
  selectedSlot: string;
  
  // Data
  messageLogs: MessageLog[];
  boxes: BoxConfig[];
  relayEmail: string;
  
  // Modal state
  showWebhookModal: boolean;
  showWebhookSuccessModal: boolean;
  webhookSuccessMessage: string;
  
  // Filter state
  startDate: string;
  endDate: string;
  fromNumberFilter: string;
  toNumberFilter: string;
  
  // Loading states
  isLoading: boolean;
  isSendingSMS: boolean;
  isCreatingWebhook: boolean;
  
  // Error state
  error: string | null;
}

export const initialcorpState: corpState = {
  currentView: corpView.SMS,
  isFullscreen: false,
  selectedBox: '',
  selectedSlot: '',
  messageLogs: [
    {
      timestamp: 'May 21, 2025, 11:31:22 AM',
      from: '(902) 941-8...',
      to: '(902) 404-2...',
      modemId: 'modem.03',
      message: 'Order confirmation #4708'
    },
    {
      timestamp: 'May 21, 2025, 11:31:15 AM',
      from: '(513) 339-3...',
      to: '(281) 125-39...',
      modemId: 'modem.03',
      message: 'Order confirmation #6987'
    },
    {
      timestamp: 'May 21, 2025, 11:31:09 AM',
      from: '(902) 941-8...',
      to: '(513) 340-75...',
      modemId: 'modem.02',
      message: 'Payment received $6128'
    },
    {
      timestamp: 'May 21, 2025, 11:31:03 AM',
      from: '(614) 708-61...',
      to: '(281) 784-76...',
      modemId: 'modem.02',
      message: 'Order confirmation #8675'
    },
    {
      timestamp: 'May 21, 2025, 11:30:57 AM',
      from: '(614) 708-61...',
      to: '(614) 604-14...',
      modemId: 'modem.01',
      message: 'Payment received $8619'
    },
    {
      timestamp: 'May 21, 2025, 11:30:51 AM',
      from: '(614) 708-61...',
      to: '(614) 782-92...',
      modemId: 'modem.02',
      message: 'Verification code #4015'
    }
  ],
  boxes: [
    { id: 'box1', name: 'Select a box' }
  ],
  relayEmail: 'corp-test@example.com',
  showWebhookModal: false,
  showWebhookSuccessModal: false,
  webhookSuccessMessage: '',
  startDate: '',
  endDate: '',
  fromNumberFilter: '',
  toNumberFilter: '',
  isLoading: false,
  isSendingSMS: false,
  isCreatingWebhook: false,
  error: null
}; 