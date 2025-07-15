import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DatabasesService } from './databases.service';

@ApiTags('Databases')
@Controller('databases')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all databases' })
  findAll() {
    return this.databasesService.findAll();
  }
} 