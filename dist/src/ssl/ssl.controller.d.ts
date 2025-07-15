import { SslService } from './ssl.service';
export declare class SslController {
    private readonly sslService;
    constructor(sslService: SslService);
    findAll(): {
        id: number;
        domain: string;
        status: string;
        expiresAt: string;
    }[];
}
