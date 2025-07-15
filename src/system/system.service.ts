import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {
  getStats() {
    return {
      cpu: '25%',
      memory: '60%',
      disk: '45%',
      uptime: '7 days',
      loadAverage: [1.2, 1.1, 0.9],
    };
  }
} 