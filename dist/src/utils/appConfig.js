"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAppConfig = loadAppConfig;
const fs = require("fs");
const path = require("path");
function loadAppConfig() {
    const configPath = path.resolve(__dirname, '../../nginx/host.conf');
    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw);
}
//# sourceMappingURL=appConfig.js.map