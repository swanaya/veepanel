import { Document } from 'mongoose';
import { DnsRecord } from './dns-record.schema';
export declare class DnsZone extends Document {
    domain: string;
    provider: string;
    status: string;
    records: DnsRecord[];
}
export declare const DnsZoneSchema: any;
