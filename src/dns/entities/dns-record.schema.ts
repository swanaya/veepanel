import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class DnsRecord {
  @Prop({ required: true }) type: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) value: string;
  @Prop({ default: 3600 }) ttl: number;
  @Prop() priority?: number;
}

export const DnsRecordSchema = SchemaFactory.createForClass(DnsRecord); 