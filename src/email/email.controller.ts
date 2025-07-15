import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  @ApiOperation({ summary: 'Get all email accounts' })
  findAll() {
    return this.emailService.findAll();
  }
} 