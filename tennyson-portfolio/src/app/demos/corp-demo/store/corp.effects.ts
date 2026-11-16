import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as corpActions from './corp.actions';
import { CorpDataService } from '../service/corp-data.service';

function apiError(error: unknown, fallback: string): string {
  if (error instanceof HttpErrorResponse) {
    const detail = error.error?.detail;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }
  }
  return fallback;
}

@Injectable()
export class corpEffects {
  private actions$ = inject(Actions);
  private corpData = inject(CorpDataService);

  loadBoxes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(corpActions.loadBoxes),
      switchMap(() =>
        this.corpData.getBoxes().pipe(
          map(boxes => corpActions.loadBoxesSuccess({ boxes })),
          catchError(error => of(corpActions.loadBoxesFailure({
            error: apiError(error, 'Could not load boxes.')
          })))
        )
      )
    )
  );

  loadMessageLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(corpActions.loadMessageLogs),
      switchMap(() =>
        this.corpData.getMessageLogs().pipe(
          map(messageLogs => corpActions.loadMessageLogsSuccess({ messageLogs })),
          catchError(error => of(corpActions.loadMessageLogsFailure({
            error: apiError(error, 'Could not load message logs.')
          })))
        )
      )
    )
  );

  loadWebhooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(corpActions.loadWebhooks),
      switchMap(() =>
        this.corpData.getWebhooks().pipe(
          map(webhooks => corpActions.loadWebhooksSuccess({ webhooks })),
          catchError(error => of(corpActions.loadWebhooksFailure({
            error: apiError(error, 'Could not load webhooks. Check that the API and database are running.')
          })))
        )
      )
    )
  );

  sendSms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(corpActions.sendSms),
      switchMap(({ smsForm, boxId, slotId }) =>
        this.corpData.sendSms({
          fromNumber: smsForm.phoneNumber,
          toNumber: smsForm.toNumber,
          message: smsForm.message,
          boxId,
          slotId
        }).pipe(
          map(response => corpActions.sendSmsSuccess({
            messageLog: response.messageLog,
            receipt: response.receipt
          })),
          catchError(error => of(corpActions.sendSmsFailure({
            error: apiError(error, 'Could not prepare the demo SMS.')
          })))
        )
      )
    )
  );

  createWebhook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(corpActions.createWebhook),
      switchMap(({ webhookForm }) => {
        if (!webhookForm.url.trim()) {
          return of(corpActions.createWebhookFailure({
            error: 'Enter a webhook URL.'
          }));
        }

        return this.corpData.createWebhook(webhookForm).pipe(
          map(webhook => corpActions.createWebhookSuccess({ webhook })),
          catchError(error => of(corpActions.createWebhookFailure({
            error: apiError(error, 'Could not save the webhook.')
          })))
        );
      })
    )
  );
}
