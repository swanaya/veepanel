import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/dns', // Change if backend runs elsewhere
  withCredentials: true,
});

// DNS Zones
export const getZones = async () => (await API.get('/zones')).data;
export const createZone = async (data: any) => (await API.post('/zones', data)).data;
export const updateZone = async (id: string, data: any) => (await API.put(`/zones/${id}`, data)).data;
export const deleteZone = async (id: string) => (await API.delete(`/zones/${id}`)).data;

// DNS Records
export const getRecords = async (zoneId: string) => (await API.get(`/zones/${zoneId}/records`)).data;
export const addRecord = async (zoneId: string, data: any) => (await API.post(`/zones/${zoneId}/records`, data)).data;
export const updateRecord = async (zoneId: string, id: string, data: any) => (await API.put(`/zones/${zoneId}/records/${id}`, data)).data;
export const deleteRecord = async (zoneId: string, id: string) => (await API.delete(`/zones/${zoneId}/records/${id}`)).data;

// Tunnel
export const startTunnel = async (userId: string, port: number) => (await API.post('/tunnel/start', { userId, port })).data;
export const stopTunnel = async (userId: string) => (await API.post('/tunnel/stop', { userId })).data;
export const tunnelStatus = async (userId: string) => (await API.get('/tunnel/status', { params: { userId } })).data;

// Import/Export
export const importZone = async (data: any) => (await API.post('/import', data)).data;
export const exportZone = async (zoneId: string) => (await API.get(`/zones/${zoneId}/export`)).data;

// CloudPanel Sync
export const syncCloudPanel = async (data: any) => (await API.post('/sync', data)).data; 