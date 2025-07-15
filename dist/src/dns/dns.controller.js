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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnsController = void 0;
const common_1 = require("@nestjs/common");
const dns_service_1 = require("./dns.service");
let DnsController = class DnsController {
    constructor(dnsService) {
        this.dnsService = dnsService;
    }
    getZones() {
        return this.dnsService.getZones();
    }
    createZone(body) {
        return this.dnsService.createZone(body);
    }
    updateZone(id, body) {
        return this.dnsService.updateZone(id, body);
    }
    deleteZone(id) {
        return this.dnsService.deleteZone(id);
    }
    getRecords(zoneId) {
        return this.dnsService.getRecords(zoneId);
    }
    addRecord(zoneId, body) {
        return this.dnsService.addRecord(zoneId, body);
    }
    updateRecord(zoneId, id, body) {
        return this.dnsService.updateRecord(zoneId, id, body);
    }
    deleteRecord(zoneId, id) {
        return this.dnsService.deleteRecord(zoneId, id);
    }
    importZone(body) {
        return this.dnsService.importZone(body);
    }
    exportZone(zoneId) {
        return this.dnsService.exportZone(zoneId);
    }
    startTunnel(body) {
        return this.dnsService.startTunnel(body);
    }
    stopTunnel(body) {
        return this.dnsService.stopTunnel(body);
    }
    tunnelStatus() {
        return this.dnsService.tunnelStatus();
    }
    syncCloudPanel(body) {
        return this.dnsService.syncCloudPanel(body);
    }
};
exports.DnsController = DnsController;
__decorate([
    (0, common_1.Get)('zones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "getZones", null);
__decorate([
    (0, common_1.Post)('zones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "createZone", null);
__decorate([
    (0, common_1.Put)('zones/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "updateZone", null);
__decorate([
    (0, common_1.Delete)('zones/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "deleteZone", null);
__decorate([
    (0, common_1.Get)('zones/:zoneId/records'),
    __param(0, (0, common_1.Param)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "getRecords", null);
__decorate([
    (0, common_1.Post)('zones/:zoneId/records'),
    __param(0, (0, common_1.Param)('zoneId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "addRecord", null);
__decorate([
    (0, common_1.Put)('zones/:zoneId/records/:id'),
    __param(0, (0, common_1.Param)('zoneId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)('zones/:zoneId/records/:id'),
    __param(0, (0, common_1.Param)('zoneId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "deleteRecord", null);
__decorate([
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "importZone", null);
__decorate([
    (0, common_1.Get)('zones/:zoneId/export'),
    __param(0, (0, common_1.Param)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "exportZone", null);
__decorate([
    (0, common_1.Post)('tunnel/start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "startTunnel", null);
__decorate([
    (0, common_1.Post)('tunnel/stop'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "stopTunnel", null);
__decorate([
    (0, common_1.Get)('tunnel/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "tunnelStatus", null);
__decorate([
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnsController.prototype, "syncCloudPanel", null);
exports.DnsController = DnsController = __decorate([
    (0, common_1.Controller)('dns'),
    __metadata("design:paramtypes", [dns_service_1.DnsService])
], DnsController);
//# sourceMappingURL=dns.controller.js.map