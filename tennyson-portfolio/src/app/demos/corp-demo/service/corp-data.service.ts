import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoxConfig, MessageLog, WebhookRecord } from '../types/corp-demo.types';
import { WebhookForm } from '../store/corp.state';
import { CorpApiService, SmsSendRequest, SmsSendResponse } from '../api/corp.api';

@Injectable({
  providedIn: 'root'
})
export class CorpDataService {
  constructor(private corpApi: CorpApiService) {}

  getBoxes(): Observable<BoxConfig[]> {
    return this.corpApi.getBoxes().pipe(
      map(boxes => boxes ?? [])
    );
  }

  getMessageLogs(): Observable<MessageLog[]> {
    return this.corpApi.getMessageLogs().pipe(
      map(logs => logs ?? [])
    );
  }

  getWebhooks(): Observable<WebhookRecord[]> {
    return this.corpApi.getWebhooks().pipe(
      map(webhooks => webhooks ?? [])
    );
  }

  createWebhook(form: WebhookForm): Observable<WebhookRecord> {
    return this.corpApi.createWebhook({
      url: form.url.trim(),
      level: form.level,
      type: form.type,
      format: form.format,
      controller: form.controller
    });
  }

  sendSms(request: SmsSendRequest): Observable<SmsSendResponse> {
    return this.corpApi.sendSms({
      ...request,
      fromNumber: request.fromNumber.trim(),
      toNumber: request.toNumber.trim(),
      message: request.message.trim()
    });
  }
}
