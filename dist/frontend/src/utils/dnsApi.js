"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCloudPanel = exports.exportZone = exports.importZone = exports.tunnelStatus = exports.stopTunnel = exports.startTunnel = exports.deleteRecord = exports.updateRecord = exports.addRecord = exports.getRecords = exports.deleteZone = exports.updateZone = exports.createZone = exports.getZones = void 0;
const axios_1 = require("axios");
const API = axios_1.default.create({
    baseURL: 'http://localhost:4000/dns',
    withCredentials: true,
});
const getZones = async () => (await API.get('/zones')).data;
exports.getZones = getZones;
const createZone = async (data) => (await API.post('/zones', data)).data;
exports.createZone = createZone;
const updateZone = async (id, data) => (await API.put(`/zones/${id}`, data)).data;
exports.updateZone = updateZone;
const deleteZone = async (id) => (await API.delete(`/zones/${id}`)).data;
exports.deleteZone = deleteZone;
const getRecords = async (zoneId) => (await API.get(`/zones/${zoneId}/records`)).data;
exports.getRecords = getRecords;
const addRecord = async (zoneId, data) => (await API.post(`/zones/${zoneId}/records`, data)).data;
exports.addRecord = addRecord;
const updateRecord = async (zoneId, id, data) => (await API.put(`/zones/${zoneId}/records/${id}`, data)).data;
exports.updateRecord = updateRecord;
const deleteRecord = async (zoneId, id) => (await API.delete(`/zones/${zoneId}/records/${id}`)).data;
exports.deleteRecord = deleteRecord;
const startTunnel = async (userId, port) => (await API.post('/tunnel/start', { userId, port })).data;
exports.startTunnel = startTunnel;
const stopTunnel = async (userId) => (await API.post('/tunnel/stop', { userId })).data;
exports.stopTunnel = stopTunnel;
const tunnelStatus = async (userId) => (await API.get('/tunnel/status', { params: { userId } })).data;
exports.tunnelStatus = tunnelStatus;
const importZone = async (data) => (await API.post('/import', data)).data;
exports.importZone = importZone;
const exportZone = async (zoneId) => (await API.get(`/zones/${zoneId}/export`)).data;
exports.exportZone = exportZone;
const syncCloudPanel = async (data) => (await API.post('/sync', data)).data;
exports.syncCloudPanel = syncCloudPanel;
//# sourceMappingURL=dnsApi.js.map