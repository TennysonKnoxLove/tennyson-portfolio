import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import * as DenwaActions from './denwa.actions';
import { MessageLog } from '../types/denwa-demo.types';

@Injectable()
export class DenwaEffects {
  private actions$ = inject(Actions);

  // SMS Demo Effect - Simulates sending SMS
  sendSMSDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DenwaActions.sendSMSDemo),
      delay(1000), // Simulate network delay
      map(({ smsForm }) => {
        // Validate form (demo validation)
        if (!smsForm.toNumber.trim()) {
          return DenwaActions.sendSMSDemoFailure({ 
            error: '📱 Demo: Please enter a recipient phone number' 
          });
        }
        
        if (!smsForm.message.trim()) {
          return DenwaActions.sendSMSDemoFailure({ 
            error: '📱 Demo: Please enter a message' 
          });
        }

        // Create demo message log entry
        const newMessage: MessageLog = {
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
          }),
          from: smsForm.phoneNumber || '(555) 123-4567',
          to: smsForm.toNumber,
          modemId: 'modem.01',
          message: `📱 DEMO: ${smsForm.message}`
        };

        return DenwaActions.sendSMSDemoSuccess({ messageLog: newMessage });
      }),
      catchError((error) => 
        of(DenwaActions.sendSMSDemoFailure({ 
          error: `📱 Demo Error: ${error.message}` 
        }))
      )
    )
  );

  // Webhook Demo Effect - Simulates creating webhook
  createWebhookDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DenwaActions.createWebhookDemo),
      delay(800), // Simulate network delay
      map(({ webhookForm }) => {
        // Validate webhook form (demo validation)
        if (!webhookForm.url.trim()) {
          return DenwaActions.createWebhookDemoFailure({ 
            error: '🔗 Demo: Please enter a webhook URL' 
          });
        }

        const successMessage = `🔗 Demo Webhook Created Successfully!
URL: ${webhookForm.url}
Level: ${webhookForm.level}
Type: ${webhookForm.type}
Format: ${webhookForm.format}

Note: This is a UI demo - no actual webhook was created.`;

        return DenwaActions.createWebhookDemoSuccess({ successMessage });
      }),
      catchError((error) => 
        of(DenwaActions.createWebhookDemoFailure({ 
          error: `🔗 Demo Error: ${error.message}` 
        }))
      )
    )
  );

  // Export CSV Demo Effect - Simulates CSV export
  exportToCSVDemo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DenwaActions.exportToCSVDemo),
      delay(500), // Simulate processing delay
      map(() => {
        // In a real app, this would trigger file download
        // The UI feedback is now handled by the CSV export dialog
        return { type: 'NO_ACTION' }; // No-op action
      })
    ),
    { dispatch: false }
  );
} 