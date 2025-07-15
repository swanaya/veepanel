"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dns_zone_schema_1 = require("./entities/dns-zone.schema");
const child_process_1 = require("child_process");
const userTunnels = {};
let DnsService = class DnsService {
    constructor(zoneModel) {
        this.zoneModel = zoneModel;
    }
    async getZones() {
        return this.zoneModel.find().lean();
    }
    async createZone(body) {
        const zone = new this.zoneModel(body);
        return zone.save();
    }
    async updateZone(id, body) {
        return this.zoneModel.findByIdAndUpdate(id, body, { new: true });
    }
    async deleteZone(id) {
        return this.zoneModel.findByIdAndDelete(id);
    }
    async getRecords(zoneId) {
        const zone = await this.zoneModel.findById(zoneId).lean();
        if (!zone)
            throw new common_1.NotFoundException('Zone not found');
        return zone.records;
    }
    async addRecord(zoneId, body) {
        const zone = await this.zoneModel.findById(zoneId);
        if (!zone)
            throw new common_1.NotFoundException('Zone not found');
        zone.records.push(body);
        await zone.save();
        return zone.records;
    }
    async updateRecord(zoneId, id, body) {
        const zone = await this.zoneModel.findById(zoneId);
        if (!zone)
            throw new common_1.NotFoundException('Zone not found');
        const rec = zone.records.id(id);
        if (!rec)
            throw new common_1.NotFoundException('Record not found');
        Object.assign(rec, body);
        await zone.save();
        return rec;
    }
    async deleteRecord(zoneId, id) {
        const zone = await this.zoneModel.findById(zoneId);
        if (!zone)
            throw new common_1.NotFoundException('Zone not found');
        zone.records.id(id).remove();
        await zone.save();
        return { message: 'Record deleted' };
    }
    importZone(body) { return { message: 'Zone imported', body }; }
    exportZone(zoneId) { return { message: 'Zone exported', zoneId }; }
    async startTunnel({ userId, port }) {
        if (userTunnels[userId])
            return { error: 'Tunnel already running' };
        const proc = (0, child_process_1.spawn)('ngrok', ['http', port.toString(), '--log', 'stdout']);
        const logs = [];
        let url = null;
        proc.stdout.on('data', (data) => {
            const str = data.toString();
            logs.push(str);
            const match = str.match(/url=(https?:\/\/[^\s]+)/);
            if (match)
                url = match[1];
        });
        proc.stderr.on('data', (data) => logs.push(data.toString()));
        proc.on('close', () => { delete userTunnels[userId]; });
        userTunnels[userId] = { process: proc, url, logs };
        return { message: 'Tunnel started', url };
    }
    async stopTunnel({ userId }) {
        const tunnel = userTunnels[userId];
        if (tunnel)
            tunnel.process.kill();
        delete userTunnels[userId];
        return { message: 'Tunnel stopped' };
    }
    async tunnelStatus({ userId }) {
        const tunnel = userTunnels[userId];
        if (!tunnel)
            return { status: 'inactive', url: null, logs: [] };
        return { status: 'active', url: tunnel.url, logs: tunnel.logs.slice(-50) };
    }
    syncCloudPanel(body) { return { message: 'CloudPanel sync started', body }; }
};
exports.DnsService = DnsService;
exports.DnsService = DnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dns_zone_schema_1.DnsZone.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], DnsService);
//# sourceMappingURL=dns.service.js.map