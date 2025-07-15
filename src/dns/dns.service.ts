import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DnsZone } from './entities/dns-zone.schema';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

interface TunnelInfo {
  process: ChildProcessWithoutNullStreams;
  url: string | null;
  logs: string[];
}

const userTunnels: Record<string, TunnelInfo> = {};

@Injectable()
export class DnsService {
  constructor(
    @InjectModel(DnsZone.name) private readonly zoneModel: Model<DnsZone>,
  ) {}

  // Zones
  async getZones() {
    return this.zoneModel.find().lean();
  }
  async createZone(body: any) {
    const zone = new this.zoneModel(body);
    return zone.save();
  }
  async updateZone(id: string, body: any) {
    return this.zoneModel.findByIdAndUpdate(id, body, { new: true });
  }
  async deleteZone(id: string) {
    return this.zoneModel.findByIdAndDelete(id);
  }

  // Records
  async getRecords(zoneId: string) {
    const zone = await this.zoneModel.findById(zoneId).lean();
    if (!zone) throw new NotFoundException('Zone not found');
    return zone.records;
  }
  async addRecord(zoneId: string, body: any) {
    const zone = await this.zoneModel.findById(zoneId);
    if (!zone) throw new NotFoundException('Zone not found');
    zone.records.push(body);
    await zone.save();
    return zone.records;
  }
  async updateRecord(zoneId: string, id: string, body: any) {
    const zone = await this.zoneModel.findById(zoneId);
    if (!zone) throw new NotFoundException('Zone not found');
    const rec = zone.records.id(id);
    if (!rec) throw new NotFoundException('Record not found');
    Object.assign(rec, body);
    await zone.save();
    return rec;
  }
  async deleteRecord(zoneId: string, id: string) {
    const zone = await this.zoneModel.findById(zoneId);
    if (!zone) throw new NotFoundException('Zone not found');
    zone.records.id(id).remove();
    await zone.save();
    return { message: 'Record deleted' };
  }

  // Import/Export (placeholders)
  importZone(body: any) { return { message: 'Zone imported', body }; }
  exportZone(zoneId: string) { return { message: 'Zone exported', zoneId }; }

  // Tunnel (ngrok per user)
  async startTunnel({ userId, port }: { userId: string, port: number }) {
    if (userTunnels[userId]) return { error: 'Tunnel already running' };
    const proc = spawn('ngrok', ['http', port.toString(), '--log', 'stdout']);
    const logs: string[] = [];
    let url: string | null = null;
    proc.stdout.on('data', (data) => {
      const str = data.toString();
      logs.push(str);
      // Parse ngrok public URL from logs
      const match = str.match(/url=(https?:\/\/[^\s]+)/);
      if (match) url = match[1];
    });
    proc.stderr.on('data', (data) => logs.push(data.toString()));
    proc.on('close', () => { delete userTunnels[userId]; });
    userTunnels[userId] = { process: proc, url, logs };
    return { message: 'Tunnel started', url };
  }
  async stopTunnel({ userId }: { userId: string }) {
    const tunnel = userTunnels[userId];
    if (tunnel) tunnel.process.kill();
    delete userTunnels[userId];
    return { message: 'Tunnel stopped' };
  }
  async tunnelStatus({ userId }: { userId: string }) {
    const tunnel = userTunnels[userId];
    if (!tunnel) return { status: 'inactive', url: null, logs: [] };
    return { status: 'active', url: tunnel.url, logs: tunnel.logs.slice(-50) };
  }

  // CloudPanel Sync (placeholder)
  syncCloudPanel(body: any) { return { message: 'CloudPanel sync started', body }; }
} 