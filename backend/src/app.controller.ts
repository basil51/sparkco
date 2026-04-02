import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): { ok: boolean } {
    return { ok: true };
  }

  @Get('health')
  getHealth() {
    const ts = new Date().toISOString();
    if (process.env.NODE_ENV === 'production') {
      return { status: 'ok', timestamp: ts };
    }
    return {
      status: 'ok',
      timestamp: ts,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
