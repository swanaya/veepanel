import { BackupService } from './backup.service';
export declare class BackupController {
    private readonly backupService;
    constructor(backupService: BackupService);
    findAll(): {
        id: number;
        name: string;
        size: string;
        createdAt: string;
    }[];
}
