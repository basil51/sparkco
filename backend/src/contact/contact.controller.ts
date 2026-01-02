import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
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
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to submit contact form',
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('test-email')
  async testEmailConnection() {
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
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to test email connection',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
