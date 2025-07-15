import { DatabasesService } from './databases.service';
export declare class DatabasesController {
    private readonly databasesService;
    constructor(databasesService: DatabasesService);
    findAll(): {
        id: number;
        name: string;
        type: string;
        size: string;
    }[];
}
