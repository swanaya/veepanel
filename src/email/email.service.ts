import { Injectable } from '@nestjs/common';
import { loadAppConfig } from '../utils/appConfig';

const appConfig = loadAppConfig();

@Injectable()
export class EmailService {
  findAll() {
    return [
      { id: 1, email: 'admin@example.com', domain: 'example.com' },
      { id: 2, email: 'support@example.com', domain: 'example.com' },
    ];
  }

  getSmtpConfig() {
    // Example usage of SMTP config from host.conf
    return appConfig.smtp;
  }
} 