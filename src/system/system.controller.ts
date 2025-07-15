import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SystemService } from './system.service';

@ApiTags('System')
@Controller('system')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get system statistics' })
  getStats() {
    return this.systemService.getStats();
  }
} 