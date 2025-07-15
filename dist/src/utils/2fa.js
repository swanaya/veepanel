"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTOTPSecret = generateTOTPSecret;
exports.generateQRCodeURL = generateQRCodeURL;
exports.verifyTOTP = verifyTOTP;
exports.generateBackupCodes = generateBackupCodes;
exports.verifyBackupCode = verifyBackupCode;
exports.removeBackupCode = removeBackupCode;
const otplib_1 = require("otplib");
const crypto = require("crypto");
function generateTOTPSecret() {
    return otplib_1.authenticator.generateSecret();
}
function generateQRCodeURL(email, secret, issuer = 'VeePanel') {
    return otplib_1.authenticator.keyuri(email, issuer, secret);
}
function verifyTOTP(token, secret) {
    try {
        return otplib_1.authenticator.verify({ token, secret });
    }
    catch (error) {
        return false;
    }
}
function generateBackupCodes(count = 10) {
    return Array.from({ length: count }, () => crypto.randomBytes(3).toString('hex').toUpperCase());
}
function verifyBackupCode(code, backupCodes) {
    return backupCodes.includes(code.toUpperCase());
}
function removeBackupCode(code, backupCodes) {
    return backupCodes.filter(backupCode => backupCode !== code.toUpperCase());
}
//# sourceMappingURL=2fa.js.map