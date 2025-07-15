import { authenticator } from 'otplib';
import * as crypto from 'crypto';

// Generate a new TOTP secret
export function generateTOTPSecret(): string {
  return authenticator.generateSecret();
}

// Generate QR code URL for authenticator apps
export function generateQRCodeURL(email: string, secret: string, issuer: string = 'VeePanel'): string {
  return authenticator.keyuri(email, issuer, secret);
}

// Verify TOTP code
export function verifyTOTP(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    return false;
  }
}

// Generate backup codes
export function generateBackupCodes(count: number = 10): string[] {
  return Array.from({ length: count }, () => 
    crypto.randomBytes(3).toString('hex').toUpperCase()
  );
}

// Verify backup code
export function verifyBackupCode(code: string, backupCodes: string[]): boolean {
  return backupCodes.includes(code.toUpperCase());
}

// Remove used backup code
export function removeBackupCode(code: string, backupCodes: string[]): string[] {
  return backupCodes.filter(backupCode => backupCode !== code.toUpperCase());
} 