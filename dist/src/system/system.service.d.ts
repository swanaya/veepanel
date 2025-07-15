export declare class SystemService {
    getStats(): {
        cpu: string;
        memory: string;
        disk: string;
        uptime: string;
        loadAverage: number[];
    };
}
