import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SslService } from './ssl.service';

@ApiTags('SSL')
@Controller('ssl')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SslController {
  constructor(private readonly sslService: SslService) {}

  @Get()
  @ApiOperation({ summary: 'Get all SSL certificates' })
  findAll() {
    return this.sslService.findAll();
  }
} 