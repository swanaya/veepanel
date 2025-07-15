import { SystemService } from './system.service';
export declare class SystemController {
    private readonly systemService;
    constructor(systemService: SystemService);
    getStats(): {
        cpu: string;
        memory: string;
        disk: string;
        uptime: string;
        loadAverage: number[];
    };
}
