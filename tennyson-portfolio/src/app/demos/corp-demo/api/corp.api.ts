import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BoxConfig, MessageLog, SmsReceipt, WebhookRecord } from '../types/corp-demo.types';
import { SMSForm, WebhookForm } from '../store/corp.state';

export interface SmsSendRequest {
  fromNumber: string;
  toNumber: string;
  message: string;
  boxId: string;
  slotId: string;
}

export interface SmsSendResponse {
  success: boolean;
  message: string;
  receipt: SmsReceipt;
  messageLog: MessageLog;
}

function apiOrigin(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:8000';
    }
  }
  return environment.apiUrl;
}

const FALLBACK_BOXES: BoxConfig[] = [
  {
    id: 'corp-01-max-z',
    name: 'corp-01-max-z',
    slots: [
      { id: 'slot-1', name: 'Slot 1', phoneNumbers: ['(415) 555-1001', '(415) 555-1002', '(415) 555-1003'] },
      { id: 'slot-2', name: 'Slot 2', phoneNumbers: ['(628) 555-2001', '(628) 555-2002', '(628) 555-2003'] },
      { id: 'slot-3', name: 'Slot 3', phoneNumbers: ['(510) 555-3001', '(510) 555-3002', '(510) 555-3003'] }
    ]
  },
  {
    id: 'corp-02-max-x',
    name: 'corp-02-max-x',
    slots: [
      { id: 'slot-1', name: 'Slot 1', phoneNumbers: ['(512) 555-4001', '(512) 555-4002', '(512) 555-4003'] },
      { id: 'slot-2', name: 'Slot 2', phoneNumbers: ['(737) 555-5001', '(737) 555-5002', '(737) 555-5003'] },
      { id: 'slot-3', name: 'Slot 3', phoneNumbers: ['(210) 555-6001', '(210) 555-6002', '(210) 555-6003'] }
    ]
  }
];

const FALLBACK_LOGS: MessageLog[] = [
  { timestamp: 'Nov 9, 2026, 9:14:02 AM', loggedAt: '2026-11-09', from: '(415) 555-1001', to: '(202) 555-0199', modemId: 'modem.01', message: 'Order confirmation #4708', boxId: 'corp-01-max-z' },
  { timestamp: 'Nov 8, 2026, 10:03:18 AM', loggedAt: '2026-11-08', from: '(512) 555-4001', to: '(214) 555-0160', modemId: 'modem.01', message: 'Order confirmation #6987', boxId: 'corp-02-max-x' },
  { timestamp: 'Nov 6, 2026, 2:22:11 PM', loggedAt: '2026-11-06', from: '(628) 555-2001', to: '(303) 555-0172', modemId: 'modem.02', message: 'Payment received $6128', boxId: 'corp-01-max-z' },
  { timestamp: 'Nov 3, 2026, 1:47:29 PM', loggedAt: '2026-11-03', from: '(737) 555-5001', to: '(737) 555-0194', modemId: 'modem.02', message: 'Payment received $8619', boxId: 'corp-02-max-x' },
  { timestamp: 'Oct 28, 2026, 11:05:44 AM', loggedAt: '2026-10-28', from: '(510) 555-3001', to: '(646) 555-0133', modemId: 'modem.03', message: 'Verification code #4015', boxId: 'corp-01-max-z' },
  { timestamp: 'Oct 21, 2026, 5:18:03 PM', loggedAt: '2026-10-21', from: '(210) 555-6001', to: '(469) 555-0117', modemId: 'modem.03', message: 'Verification code #8831', boxId: 'corp-02-max-x' },
  { timestamp: 'Oct 12, 2026, 4:41:09 PM', loggedAt: '2026-10-12', from: '(415) 555-1002', to: '(702) 555-0188', modemId: 'modem.01', message: 'Shipment update #2281', boxId: 'corp-01-max-z' },
  { timestamp: 'Oct 2, 2026, 9:55:40 AM', loggedAt: '2026-10-02', from: '(512) 555-4002', to: '(972) 555-0149', modemId: 'modem.01', message: 'Delivery window confirmed', boxId: 'corp-02-max-x' },
  { timestamp: 'Sep 30, 2026, 8:12:55 AM', loggedAt: '2026-09-30', from: '(628) 555-2002', to: '(917) 555-0104', modemId: 'modem.02', message: 'Appointment reminder', boxId: 'corp-01-max-z' },
  { timestamp: 'Sep 18, 2026, 3:26:12 PM', loggedAt: '2026-09-18', from: '(737) 555-5002', to: '(210) 555-0175', modemId: 'modem.02', message: 'Support ticket #5520', boxId: 'corp-02-max-x' }
];

function unreachable(error: unknown): boolean {
  return !(error instanceof HttpErrorResponse) || error.status === 0;
}

@Injectable({
  providedIn: 'root'
})
export class CorpApiService {
  private readonly baseUrl = `${apiOrigin()}/corp`;

  constructor(private http: HttpClient) {}

  getBoxes(): Observable<BoxConfig[]> {
    return this.http.get<BoxConfig[]>(`${this.baseUrl}/boxes`).pipe(
      catchError(error => unreachable(error) ? of(FALLBACK_BOXES).pipe(delay(200)) : throwError(() => error))
    );
  }

  getMessageLogs(): Observable<MessageLog[]> {
    return this.http.get<MessageLog[]>(`${this.baseUrl}/messages`).pipe(
      catchError(error => unreachable(error) ? of(FALLBACK_LOGS).pipe(delay(200)) : throwError(() => error))
    );
  }

  getWebhooks(): Observable<WebhookRecord[]> {
    return this.http.get<WebhookRecord[]>(`${this.baseUrl}/webhooks`);
  }

  createWebhook(form: WebhookForm): Observable<WebhookRecord> {
    return this.http.post<WebhookRecord>(`${this.baseUrl}/webhooks`, form);
  }

  sendSms(request: SmsSendRequest): Observable<SmsSendResponse> {
    return this.http.post<SmsSendResponse>(`${this.baseUrl}/sms`, request).pipe(
      catchError(error => unreachable(error) ? of(this.fallbackSms(request)).pipe(delay(400)) : throwError(() => error))
    );
  }

  private fallbackSms(request: SmsSendRequest): SmsSendResponse {
    const box = FALLBACK_BOXES.find(item => item.id === request.boxId);
    const slot = box?.slots.find(item => item.id === request.slotId);
    const now = new Date();
    const loggedAt = now.toISOString().slice(0, 10);
    const receipt: SmsReceipt = {
      from: request.fromNumber,
      to: request.toNumber,
      message: request.message,
      boxName: box?.name ?? request.boxId,
      slotName: slot?.name ?? request.slotId,
      note: 'This is a UI demonstration. No SMS was sent.'
    };

    return {
      success: true,
      message: receipt.note,
      receipt,
      messageLog: {
        timestamp: now.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit'
        }),
        loggedAt,
        from: request.fromNumber,
        to: request.toNumber,
        modemId: slot?.id === 'slot-2' ? 'modem.02' : slot?.id === 'slot-3' ? 'modem.03' : 'modem.01',
        message: request.message,
        boxId: request.boxId
      }
    };
  }
}
