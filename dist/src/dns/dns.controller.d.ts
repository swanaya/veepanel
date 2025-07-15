import { DnsService } from './dns.service';
export declare class DnsController {
    private readonly dnsService;
    constructor(dnsService: DnsService);
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
    startTunnel(body: any): Promise<{
        error: string;
        message?: undefined;
        url?: undefined;
    } | {
        message: string;
        url: string;
        error?: undefined;
    }>;
    stopTunnel(body: any): Promise<{
        message: string;
    }>;
    tunnelStatus(): Promise<{
        status: string;
        url: string;
        logs: string[];
    }>;
    syncCloudPanel(body: any): {
        message: string;
        body: any;
    };
}
