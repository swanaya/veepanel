"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DNS;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const dnsApi = require("../utils/dnsApi");
const lucide_react_1 = require("lucide-react");
const react_hot_toast_1 = require("react-hot-toast");
function DNS() {
    const queryClient = (0, react_query_1.useQueryClient)();
    const userId = 'demo-user';
    const tunnelPort = 8080;
    const { data: zones = [], isLoading: zonesLoading } = (0, react_query_1.useQuery)(['dnsZones'], dnsApi.getZones, { staleTime: 1000 * 60 });
    const createZone = (0, react_query_1.useMutation)(dnsApi.createZone, {
        onSuccess: () => { react_hot_toast_1.default.success('Zone created'); },
        onError: () => react_hot_toast_1.default.error('Failed to create zone'),
    });
    const updateZone = (0, react_query_1.useMutation)(({ id, data }) => dnsApi.updateZone(id, data), {
        onSuccess: () => { react_hot_toast_1.default.success('Zone updated'); },
        onError: () => react_hot_toast_1.default.error('Failed to update zone'),
    });
    const deleteZone = (0, react_query_1.useMutation)(dnsApi.deleteZone, {
        onSuccess: () => { react_hot_toast_1.default.success('Zone deleted'); },
        onError: () => react_hot_toast_1.default.error('Failed to delete zone'),
    });
    const [selectedZone, setSelectedZone] = (0, react_1.useState)(null);
    const { data: records = [], isLoading: recordsLoading } = (0, react_query_1.useQuery)(['dnsRecords', selectedZone?._id], () => selectedZone ? dnsApi.getRecords(selectedZone._id) : [], { enabled: !!selectedZone, staleTime: 1000 * 60 });
    const addRecord = (0, react_query_1.useMutation)(({ zoneId, data }) => dnsApi.addRecord(zoneId, data), {
        onSuccess: () => { react_hot_toast_1.default.success('Record added'); },
        onError: () => react_hot_toast_1.default.error('Failed to add record'),
    });
    const updateRecord = (0, react_query_1.useMutation)(({ zoneId, id, data }) => dnsApi.updateRecord(zoneId, id, data), {
        onSuccess: () => { react_hot_toast_1.default.success('Record updated'); },
        onError: () => react_hot_toast_1.default.error('Failed to update record'),
    });
    const deleteRecord = (0, react_query_1.useMutation)(({ zoneId, id }) => dnsApi.deleteRecord(zoneId, id), {
        onSuccess: () => { react_hot_toast_1.default.success('Record deleted'); },
        onError: () => react_hot_toast_1.default.error('Failed to delete record'),
    });
    const { data: tunnel = { status: 'inactive', url: null, logs: [] }, refetch: refetchTunnel } = (0, react_query_1.useQuery)(['tunnelStatus', userId], () => dnsApi.tunnelStatus(userId), { refetchInterval: 3000 });
    const startTunnel = (0, react_query_1.useMutation)(() => dnsApi.startTunnel(userId, tunnelPort), {
        onSuccess: () => { react_hot_toast_1.default.success('Tunnel started'); },
        onError: () => react_hot_toast_1.default.error('Failed to start tunnel'),
    });
    const stopTunnel = (0, react_query_1.useMutation)(() => dnsApi.stopTunnel(userId), {
        onSuccess: () => { react_hot_toast_1.default.success('Tunnel stopped'); },
        onError: () => react_hot_toast_1.default.error('Failed to stop tunnel'),
    });
    const [showZoneModal, setShowZoneModal] = (0, react_1.useState)(false);
    const [showRecordModal, setShowRecordModal] = (0, react_1.useState)(false);
    const [showCloudPanelModal, setShowCloudPanelModal] = (0, react_1.useState)(false);
    const handleAddZone = () => setShowZoneModal(true);
    const handleEditZone = (zone) => { setSelectedZone(zone); setShowZoneModal(true); };
    const handleDeleteZone = (zone) => { if (confirm(`Delete DNS zone ${zone.domain}?`))
        deleteZone.mutate(zone._id); };
    const handleAddRecord = (zone) => { setSelectedZone(zone); setShowRecordModal(true); };
    const handleEditRecord = (zone, record) => { setSelectedZone(zone); setShowRecordModal(true); };
    const handleDeleteRecord = (zone, record) => { if (confirm(`Delete record ${record.type} ${record.name}?`))
        deleteRecord.mutate({ zoneId: zone._id, id: record._id }); };
    const handleImportZone = () => react_hot_toast_1.default.success('Import (not implemented)');
    const handleExportZone = (zone) => react_hot_toast_1.default.success('Export (not implemented)');
    const handleSyncCloudPanel = () => react_hot_toast_1.default.success('Sync with CloudPanel (not implemented)');
    const handleConnectCloudPanel = () => setShowCloudPanelModal(true);
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DNS Manager</h1>
          <p className="text-gray-600">Manage DNS zones, records, and tunnels</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary" onClick={handleImportZone}>
            <lucide_react_1.Upload className="h-4 w-4 mr-2"/> Import Zone
          </button>
          <button className="btn-secondary" onClick={handleSyncCloudPanel}>
            <lucide_react_1.RefreshCw className="h-4 w-4 mr-2"/> Sync CloudPanel
          </button>
          <button className="btn-secondary" onClick={handleConnectCloudPanel}>
            <lucide_react_1.Cloud className="h-4 w-4 mr-2"/> Connect CloudPanel
          </button>
          <button className="btn-primary" onClick={handleAddZone}>
            <lucide_react_1.Plus className="h-4 w-4 mr-2"/> Add Zone
          </button>
        </div>
      </div>

      
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">DNS Zones</h3>
        </div>
        <div className="overflow-x-auto">
          {zonesLoading ? (<div className="p-8 text-center text-gray-400">Loading zones...</div>) : (<table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {zones.length === 0 && (<tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">No DNS zones found.</td>
                  </tr>)}
                {zones.map((zone) => (<tr key={zone._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <lucide_react_1.Globe className="h-4 w-4 text-gray-400 mr-2"/>
                        <span className="text-sm font-medium text-gray-900">{zone.domain}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{zone.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${zone.status === 'synced' ? 'bg-green-100 text-green-800' :
                    zone.status === 'out-of-sync' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                        {zone.status === 'synced' && <lucide_react_1.CheckCircle className="h-4 w-4 mr-1"/>}
                        {zone.status === 'out-of-sync' && <lucide_react_1.AlertTriangle className="h-4 w-4 mr-1"/>}
                        {zone.status === 'error' && <lucide_react_1.Shield className="h-4 w-4 mr-1"/>}
                        {zone.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {zone.records?.length || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => handleExportZone(zone)} className="text-gray-400 hover:text-gray-600" title="Export Zone">
                          <lucide_react_1.Download className="h-4 w-4"/>
                        </button>
                        <button onClick={() => handleAddRecord(zone)} className="text-gray-400 hover:text-gray-600" title="Add Record">
                          <lucide_react_1.Plus className="h-4 w-4"/>
                        </button>
                        <button onClick={() => handleEditZone(zone)} className="text-gray-400 hover:text-gray-600" title="Edit Zone">
                          <lucide_react_1.Edit className="h-4 w-4"/>
                        </button>
                        <button onClick={() => handleDeleteZone(zone)} className="text-red-400 hover:text-red-600" title="Delete Zone">
                          <lucide_react_1.Trash2 className="h-4 w-4"/>
                        </button>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>)}
        </div>
      </div>

      
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Tunnel</h3>
          <div>
            {tunnel.status === 'active' ? (<button className="btn-danger" onClick={() => stopTunnel.mutate()} disabled={stopTunnel.isLoading}>
                Stop Tunnel
              </button>) : (<button className="btn-primary" onClick={() => startTunnel.mutate()} disabled={startTunnel.isLoading}>
                Create Tunnel
              </button>)}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tunnel.status === 'active' ? 'bg-green-100 text-green-800' :
            tunnel.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'}`}>
              {tunnel.status === 'active' && <lucide_react_1.CheckCircle className="h-4 w-4 mr-1"/>}
              {tunnel.status === 'inactive' && <lucide_react_1.Link2 className="h-4 w-4 mr-1"/>}
              {tunnel.status === 'error' && <lucide_react_1.AlertTriangle className="h-4 w-4 mr-1"/>}
              {tunnel.status}
            </span>
            {tunnel.url && (<a href={tunnel.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                {tunnel.url}
              </a>)}
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Tunnel Logs</h4>
            <div className="bg-gray-100 rounded p-2 text-xs h-24 overflow-y-auto">
              {tunnel.logs.length === 0 ? 'No logs yet.' : tunnel.logs.map((log, i) => <div key={i}>{log}</div>)}
            </div>
          </div>
        </div>
      </div>

      
      {showZoneModal && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{selectedZone ? 'Edit Zone' : 'Add Zone'}</h3>
            <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const domain = form.elements.namedItem('domain').value.trim();
                if (!domain)
                    return react_hot_toast_1.default.error('Domain is required');
                if (selectedZone) {
                    updateZone.mutate({ id: selectedZone._id, data: { domain } }, { onSuccess: () => { setShowZoneModal(false); queryClient.invalidateQueries(['dnsZones']); } });
                }
                else {
                    createZone.mutate({ domain }, { onSuccess: () => { setShowZoneModal(false); queryClient.invalidateQueries(['dnsZones']); } });
                }
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <input name="domain" className="input mt-1" placeholder="example.com" defaultValue={selectedZone?.domain || ''} disabled={createZone.isLoading || updateZone.isLoading}/>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="btn-secondary" onClick={() => { setShowZoneModal(false); setSelectedZone(null); }}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={createZone.isLoading || updateZone.isLoading}>
                  {createZone.isLoading || updateZone.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>)}
      {showRecordModal && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add/Edit Record</h3>
            <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const type = form.elements.namedItem('type').value;
                const name = form.elements.namedItem('name').value.trim();
                const value = form.elements.namedItem('value').value.trim();
                const ttl = parseInt(form.elements.namedItem('ttl').value, 10) || 3600;
                const priority = parseInt(form.elements.namedItem('priority').value, 10) || undefined;
                if (!type || !name || !value)
                    return react_hot_toast_1.default.error('All fields are required');
                if (selectedZone) {
                    addRecord.mutate({ zoneId: selectedZone._id, data: { type, name, value, ttl, priority } }, {
                        onSuccess: () => { setShowRecordModal(false); queryClient.invalidateQueries(['dnsRecords', selectedZone._id]); },
                    });
                }
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select name="type" className="input mt-1" defaultValue="A">
                  <option>A</option>
                  <option>AAAA</option>
                  <option>CNAME</option>
                  <option>MX</option>
                  <option>TXT</option>
                  <option>SRV</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" className="input mt-1" placeholder="@ or www"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <input name="value" className="input mt-1" placeholder="IP or value"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">TTL</label>
                <input name="ttl" className="input mt-1" placeholder="3600" defaultValue={3600}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority (for MX/SRV)</label>
                <input name="priority" className="input mt-1" placeholder="10"/>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="btn-secondary" onClick={() => { setShowRecordModal(false); setSelectedZone(null); }}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={addRecord.isLoading}>
                  {addRecord.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>)}
      {showCloudPanelModal && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Connect to CloudPanel</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
                <input className="input mt-1" placeholder="https://cloudpanel.example.com/api"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input className="input mt-1" placeholder="API Key"/>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="btn-secondary" onClick={() => setShowCloudPanelModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Connect</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=DNS.js.map