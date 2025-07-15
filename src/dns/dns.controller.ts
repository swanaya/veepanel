import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DnsService } from './dns.service';

@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  // Zones
  @Get('zones')
  getZones() {
    return this.dnsService.getZones();
  }

  @Post('zones')
  createZone(@Body() body: any) {
    return this.dnsService.createZone(body);
  }

  @Put('zones/:id')
  updateZone(@Param('id') id: string, @Body() body: any) {
    return this.dnsService.updateZone(id, body);
  }

  @Delete('zones/:id')
  deleteZone(@Param('id') id: string) {
    return this.dnsService.deleteZone(id);
  }

  // Records
  @Get('zones/:zoneId/records')
  getRecords(@Param('zoneId') zoneId: string) {
    return this.dnsService.getRecords(zoneId);
  }

  @Post('zones/:zoneId/records')
  addRecord(@Param('zoneId') zoneId: string, @Body() body: any) {
    return this.dnsService.addRecord(zoneId, body);
  }

  @Put('zones/:zoneId/records/:id')
  updateRecord(@Param('zoneId') zoneId: string, @Param('id') id: string, @Body() body: any) {
    return this.dnsService.updateRecord(zoneId, id, body);
  }

  @Delete('zones/:zoneId/records/:id')
  deleteRecord(@Param('zoneId') zoneId: string, @Param('id') id: string) {
    return this.dnsService.deleteRecord(zoneId, id);
  }

  // Import/Export
  @Post('import')
  importZone(@Body() body: any) {
    return this.dnsService.importZone(body);
  }

  @Get('zones/:zoneId/export')
  exportZone(@Param('zoneId') zoneId: string) {
    return this.dnsService.exportZone(zoneId);
  }

  // Tunnel
  @Post('tunnel/start')
  startTunnel(@Body() body: any) {
    return this.dnsService.startTunnel(body);
  }

  @Post('tunnel/stop')
  stopTunnel(@Body() body: any) {
    return this.dnsService.stopTunnel(body);
  }

  @Get('tunnel/status')
  tunnelStatus() {
    return this.dnsService.tunnelStatus();
  }

  // CloudPanel Sync
  @Post('sync')
  syncCloudPanel(@Body() body: any) {
    return this.dnsService.syncCloudPanel(body);
  }
} 