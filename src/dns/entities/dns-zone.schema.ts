import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DnsRecord, DnsRecordSchema } from './dns-record.schema';

@Schema()
export class DnsZone extends Document {
  @Prop({ required: true, unique: true }) domain: string;
  @Prop({ default: 'local' }) provider: string;
  @Prop({ default: 'synced' }) status: string;
  @Prop({ type: [DnsRecordSchema], default: [] }) records: DnsRecord[];
}

export const DnsZoneSchema = SchemaFactory.createForClass(DnsZone); 