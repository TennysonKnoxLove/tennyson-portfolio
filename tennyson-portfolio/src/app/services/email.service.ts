import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  async sendEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(`${environment.apiUrl}/contact`, formData)
      );
      return {
        success: true,
        message: response.message || "Message sent successfully! I'll get back to you soon."
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: this.readError(error)
      };
    }
  }

  private readError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const detail = error.error?.detail;
      if (typeof detail === 'string' && detail.trim()) {
        return detail;
      }
    }
    return "Couldn't send your message. Please try again, or email tennysonknoxlove@gmail.com directly.";
  }
}
