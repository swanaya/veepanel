import { Injectable } from '@nestjs/common';

@Injectable()
export class BackupService {
  findAll() {
    return [
      { id: 1, name: 'backup-2024-01-01', size: '1.2GB', createdAt: '2024-01-01' },
      { id: 2, name: 'backup-2024-01-02', size: '1.3GB', createdAt: '2024-01-02' },
    ];
  }
} 