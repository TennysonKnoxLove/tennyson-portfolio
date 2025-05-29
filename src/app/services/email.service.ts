import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

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
  // Replace these with your actual EmailJS credentials
  private serviceId = 'service_hh8jtdf';      // Get this from EmailJS > Email Services
  private templateId = 'template_q0i4ql5';    // Get this from EmailJS > Email Templates (the one you just created)
  private publicKey = 'TXAAgIKXmajlkKoR1';        // ✅ Your actual public key

  constructor() {
    // Initialize EmailJS with your public key
    emailjs.init(this.publicKey);
  }

  async sendEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        // This will be sent to the email connected to your EmailJS service
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('Email sent successfully:', response);
      return { 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.' 
      };
    } catch (error: any) {
      console.error('Failed to send email:', error);
      
      // Better error handling
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error?.status === 422) {
        errorMessage = 'Invalid email format. Please check your email address.';
      } else if (error?.status === 400) {
        errorMessage = 'Missing required information. Please fill all fields.';
      } else if (error?.text) {
        errorMessage = error.text;
      }

      return { 
        success: false, 
        message: errorMessage 
      };
    }
  }
} 