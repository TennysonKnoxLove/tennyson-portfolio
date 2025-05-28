# EmailJS Setup Guide

To make your contact form functional, you need to set up EmailJS. Follow these steps:

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Connect Your Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authorization steps
5. Copy your **Service ID**

## 3. Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

```
From: {{from_name}} <{{from_email}}>
Subject: Portfolio Contact: {{subject}}

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. Save the template and copy your **Template ID**

## 4. Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key**

## 5. Update the Email Service

Open `src/app/services/email.service.ts` and replace:

```typescript
private serviceId = 'YOUR_SERVICE_ID';        // Replace with your Service ID
private templateId = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID
private publicKey = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

Also update:

```typescript
to_email: "your-email@example.com"; // Replace with your actual email
```

## 6. Update Social Links

In `src/app/pages/contact-page/contact-page.component.html`, update the social links:

```html
<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="social-link">
  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="social-link"> <a href="mailto:your-email@example.com" class="social-link"></a></a
></a>
```

## 7. Test the Form

1. Start your development server
2. Go to the contact page
3. Fill out and submit the form
4. Check your email for the test message

## Free Tier Limits

- 200 emails per month
- Perfect for portfolio contact forms

## Troubleshooting

- Check browser console for error messages
- Verify all IDs and keys are correct
- Ensure your email service is properly connected
- Check EmailJS dashboard for sent email logs

That's it! Your contact form is now fully functional. 🚀
