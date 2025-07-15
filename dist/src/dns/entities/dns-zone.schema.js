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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnsZoneSchema = exports.DnsZone = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dns_record_schema_1 = require("./dns-record.schema");
let DnsZone = class DnsZone extends mongoose_2.Document {
};
exports.DnsZone = DnsZone;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], DnsZone.prototype, "domain", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'local' }),
    __metadata("design:type", String)
], DnsZone.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'synced' }),
    __metadata("design:type", String)
], DnsZone.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [dns_record_schema_1.DnsRecordSchema], default: [] }),
    __metadata("design:type", Array)
], DnsZone.prototype, "records", void 0);
exports.DnsZone = DnsZone = __decorate([
    (0, mongoose_1.Schema)()
], DnsZone);
exports.DnsZoneSchema = mongoose_1.SchemaFactory.createForClass(DnsZone);
//# sourceMappingURL=dns-zone.schema.js.map