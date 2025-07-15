import { SitesService } from './sites.service';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
    findAll(): {
        id: number;
        domain: string;
        status: string;
    }[];
}
