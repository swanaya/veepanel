import { Model } from 'mongoose';
import { DnsZone } from './entities/dns-zone.schema';
export declare class DnsService {
    private readonly zoneModel;
    constructor(zoneModel: Model<DnsZone>);
    getZones(): Promise<any>;
    createZone(body: any): Promise<any>;
    updateZone(id: string, body: any): Promise<any>;
    deleteZone(id: string): Promise<any>;
    getRecords(zoneId: string): Promise<any>;
    addRecord(zoneId: string, body: any): Promise<any>;
    updateRecord(zoneId: string, id: string, body: any): Promise<any>;
    deleteRecord(zoneId: string, id: string): Promise<{
        message: string;
    }>;
    importZone(body: any): {
        message: string;
        body: any;
    };
    exportZone(zoneId: string): {
        message: string;
        zoneId: string;
    };
    startTunnel({ userId, port }: {
        userId: string;
        port: number;
    }): Promise<{
        error: string;
        message?: undefined;
        url?: undefined;
    } | {
        message: string;
        url: string;
        error?: undefined;
    }>;
    stopTunnel({ userId }: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
    tunnelStatus({ userId }: {
        userId: string;
    }): Promise<{
        status: string;
        url: string;
        logs: string[];
    }>;
    syncCloudPanel(body: any): {
        message: string;
        body: any;
    };
}
