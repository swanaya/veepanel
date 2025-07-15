import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabasesService {
  findAll() {
    return [
      { id: 1, name: 'myapp_db', type: 'mysql', size: '50MB' },
      { id: 2, name: 'blog_db', type: 'postgresql', size: '25MB' },
    ];
  }
} 