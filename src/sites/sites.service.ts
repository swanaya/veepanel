import { Injectable } from '@nestjs/common';

@Injectable()
export class SitesService {
  findAll() {
    return [
      { id: 1, domain: 'example.com', status: 'active' },
      { id: 2, domain: 'test.com', status: 'inactive' },
    ];
  }
} 