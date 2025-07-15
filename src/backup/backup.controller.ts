import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BackupService } from './backup.service';

@ApiTags('Backup')
@Controller('backup')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get()
  @ApiOperation({ summary: 'Get all backups' })
  findAll() {
    return this.backupService.findAll();
  }
} 