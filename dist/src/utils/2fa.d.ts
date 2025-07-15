export declare function generateTOTPSecret(): string;
export declare function generateQRCodeURL(email: string, secret: string, issuer?: string): string;
export declare function verifyTOTP(token: string, secret: string): boolean;
export declare function generateBackupCodes(count?: number): string[];
export declare function verifyBackupCode(code: string, backupCodes: string[]): boolean;
export declare function removeBackupCode(code: string, backupCodes: string[]): string[];
