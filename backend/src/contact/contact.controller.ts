import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpStatus,
  HttpException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute
  @Post('submit')
  async submitContactForm(@Body(ValidationPipe) contactData: ContactDto) {
    try {
      const result = await this.contactService.submitContactForm(contactData);
      return {
        success: true,
        message: result.message,
        timestamp: new Date().toISOString(),
      };
    } catch (error: unknown) {
      const isProd = process.env.NODE_ENV === 'production';
      const message =
        isProd
          ? 'Failed to submit contact form'
          : error instanceof Error
            ? error.message
            : 'Failed to submit contact form';
      throw new HttpException(
        {
          success: false,
          message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Development: open. Production: disabled unless EMAIL_TEST_SECRET is set and
   * request includes matching header `x-email-test-secret` (avoids SMTP probe abuse).
   */
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('test-email')
  async testEmailConnection(@Req() req: Request) {
    if (process.env.NODE_ENV === 'production') {
      const secret = process.env.EMAIL_TEST_SECRET;
      const header = req.headers['x-email-test-secret'];
      const provided = Array.isArray(header) ? header[0] : header;
      if (!secret || !provided || provided !== secret) {
        throw new NotFoundException();
      }
    }

    try {
      const isConnected = await this.contactService.testEmailConnection();
      return {
        success: true,
        connected: isConnected,
        message: isConnected
          ? 'Email connection successful'
          : 'Email connection failed',
        timestamp: new Date().toISOString(),
      };
    } catch (error: unknown) {
      const isProd = process.env.NODE_ENV === 'production';
      throw new HttpException(
        {
          success: false,
          message: 'Failed to test email connection',
          ...(!isProd && error instanceof Error
            ? { error: error.message }
            : {}),
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
