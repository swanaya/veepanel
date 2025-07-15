import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SitesService } from './sites.service';

@ApiTags('Sites')
@Controller('sites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sites' })
  findAll() {
    return this.sitesService.findAll();
  }
} 