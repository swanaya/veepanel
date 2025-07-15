import { Injectable } from '@nestjs/common';

@Injectable()
export class SslService {
  findAll() {
    return [
      { id: 1, domain: 'example.com', status: 'active', expiresAt: '2024-12-31' },
      { id: 2, domain: 'test.com', status: 'pending', expiresAt: null },
    ];
  }
} 