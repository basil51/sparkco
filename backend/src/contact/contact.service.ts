import { Injectable, Logger } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { createTransport, Transporter } from 'nodemailer';
import xss from 'xss';
import { escape } from 'validator';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: Transporter;

  constructor() {
    // Initialize email transporter
    this.transporter = createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });
  }

  async submitContactForm(
    contactData: ContactDto,
    ): Promise<{ success: boolean; message: string }> {
    try {
      // Sanitize all input data to prevent XSS attacks
      const sanitizedData: ContactDto = {
        name: this.sanitizeInput(contactData.name),
        email: this.sanitizeInput(contactData.email),
        company: contactData.company ? this.sanitizeInput(contactData.company) : undefined,
        phone: contactData.phone ? this.sanitizeInput(contactData.phone) : undefined,
        service: contactData.service ? this.sanitizeInput(contactData.service) : undefined,
        message: this.sanitizeInput(contactData.message),
      };

      // Validate email format
      if (!this.isValidEmail(sanitizedData.email)) {
        throw new Error('Invalid email format');
      }

      this.logger.log(`New contact form submission from: ${sanitizedData.email}`);

      // Log the submission (without sensitive data)
      this.logger.log(
        `Contact form submitted successfully for: ${sanitizedData.name} (${sanitizedData.email})`,
      );

      // Try to send email notification (optional for now)
      try {
        await this.sendEmailNotification(sanitizedData);
        this.logger.log('Email notification sent successfully');
      } catch (emailError) {
        this.logger.warn(`Email notification failed: ${emailError.message}`);
        // Don't fail the entire request if email fails
      }

      return {
        success: true,
        message:
          'Thank you for your message! We will get back to you within 24 hours.',
      };
    } catch (error) {
      this.logger.error(
        `Error processing contact form: ${error.message}`,
        error.stack,
      );
      // Don't expose internal error details in production
      const errorMessage = process.env.NODE_ENV === 'production'
        ? 'Failed to submit contact form. Please try again later.'
        : error.message;
      throw new Error(errorMessage);
    }
  }

  /**
   * Sanitize input to prevent XSS attacks
   */
  private sanitizeInput(input: string): string {
    if (!input) return '';
    // First escape HTML entities, then use XSS filter
    return xss(escape(input.trim()));
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async sendEmailNotification(contactData: ContactDto): Promise<void> {
    const emailContent = this.generateEmailContent(contactData);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'basel@sparkco.vip',
      subject: `New Contact Form Submission - ${contactData.name}`,
      html: emailContent,
    };

    await this.transporter.sendMail(mailOptions);
    this.logger.log(
      `Email notification sent for contact form from: ${contactData.email}`,
    );
  }

  private generateEmailContent(contactData: ContactDto): string {
    const timestamp = new Date().toLocaleString();
    
    // Sanitize all user input before inserting into HTML
    const safeName = this.escapeHtml(contactData.name);
    const safeEmail = this.escapeHtml(contactData.email);
    const safeCompany = contactData.company ? this.escapeHtml(contactData.company) : '';
    const safePhone = contactData.phone ? this.escapeHtml(contactData.phone) : '';
    const safeService = contactData.service ? this.escapeHtml(contactData.service) : '';
    const safeMessage = this.escapeHtml(contactData.message).replace(/\n/g, '<br>');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #667eea; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>Received on ${timestamp}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${safeName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${safeEmail}</div>
            </div>
            ${
              contactData.company
                ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${safeCompany}</div>
            </div>
            `
                : ''
            }
            ${
              contactData.phone
                ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${safePhone}</div>
            </div>
            `
                : ''
            }
            ${
              contactData.service
                ? `
            <div class="field">
              <div class="label">Service of Interest:</div>
              <div class="value">${safeService}</div>
            </div>
            `
                : ''
            }
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${safeMessage}</div>
            </div>
            <div class="footer">
              <p>This message was sent from the Sparkco VIP contact form.</p>
              <p>Please respond to the customer within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Escape HTML entities to prevent XSS in email content
   */
  private escapeHtml(text: string): string {
    if (!text) return '';
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  async testEmailConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('Email connection verified successfully');
      return true;
    } catch (error) {
      this.logger.error(`Email connection failed: ${error.message}`);
      return false;
    }
  }
}
