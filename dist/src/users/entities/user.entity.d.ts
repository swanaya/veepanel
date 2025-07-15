export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    forcePasswordChange: boolean;
    isTemporaryEmail: boolean;
    setupCompleted: boolean;
    twoFactorEnabled: boolean;
    twoFactorSecret: string;
    twoFactorBackupCodes: string[];
    createdAt: Date;
    updatedAt: Date;
}
