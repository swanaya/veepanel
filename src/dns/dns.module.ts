import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DnsController } from './dns.controller';
import { DnsService } from './dns.service';
import { DnsZone, DnsZoneSchema } from './entities/dns-zone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DnsZone.name, schema: DnsZoneSchema }])],
  controllers: [DnsController],
  providers: [DnsService],
})
export class DnsModule {} 