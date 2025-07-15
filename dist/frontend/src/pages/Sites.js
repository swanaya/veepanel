"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sites;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const axios_1 = require("axios");
const react_hot_toast_1 = require("react-hot-toast");
function Sites() {
    const [showAddModal, setShowAddModal] = (0, react_1.useState)(false);
    const [selectedSite, setSelectedSite] = (0, react_1.useState)(null);
    const queryClient = (0, react_query_1.useQueryClient)();
    const { data: sites, isLoading } = (0, react_query_1.useQuery)('sites', async () => {
        const response = await axios_1.default.get('http://localhost:4000/sites');
        return response.data;
    });
    const toggleSiteStatus = (0, react_query_1.useMutation)(async ({ siteId, status }) => {
        const response = await axios_1.default.patch(`http://localhost:4000/sites/${siteId}/status`, { status });
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('sites');
            react_hot_toast_1.default.success('Site status updated');
        },
        onError: () => {
            react_hot_toast_1.default.error('Failed to update site status');
        },
    });
    const deleteSite = (0, react_query_1.useMutation)(async (siteId) => {
        await axios_1.default.delete(`http://localhost:4000/sites/${siteId}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('sites');
            react_hot_toast_1.default.success('Site deleted');
        },
        onError: () => {
            react_hot_toast_1.default.error('Failed to delete site');
        },
    });
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100';
            case 'suspended':
                return 'text-red-600 bg-red-100';
            case 'maintenance':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <lucide_react_1.Play className="h-4 w-4"/>;
            case 'suspended':
                return <lucide_react_1.Pause className="h-4 w-4"/>;
            case 'maintenance':
                return <lucide_react_1.Pause className="h-4 w-4"/>;
            default:
                return <lucide_react_1.Pause className="h-4 w-4"/>;
        }
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sites</h1>
          <p className="text-gray-600">Manage your web sites and domains</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
          Add Site
        </button>
      </div>

      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <lucide_react_1.Globe className="h-6 w-6 text-green-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Sites</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sites?.filter(site => site.status === 'active').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
              <lucide_react_1.Pause className="h-6 w-6 text-red-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Suspended Sites</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sites?.filter(site => site.status === 'suspended').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <lucide_react_1.Folder className="h-6 w-6 text-blue-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Sites</p>
              <p className="text-2xl font-semibold text-gray-900">{sites?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Sites</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PHP Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SSL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disk Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sites?.map((site) => (<tr key={site.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <lucide_react_1.Globe className="h-4 w-4 text-gray-400 mr-2"/>
                      <span className="text-sm font-medium text-gray-900">{site.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                      {getStatusIcon(site.status)}
                      <span className="ml-1 capitalize">{site.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {site.phpVersion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {site.ssl ? (<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>) : (<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Inactive
                      </span>)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {site.diskUsage} MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(site.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => window.open(`http://${site.domain}`, '_blank')} className="text-gray-400 hover:text-gray-600" title="Visit Site">
                        <lucide_react_1.ExternalLink className="h-4 w-4"/>
                      </button>
                      <button onClick={() => setSelectedSite(site)} className="text-gray-400 hover:text-gray-600" title="Edit Site">
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button>
                      <button onClick={() => toggleSiteStatus.mutate({
                siteId: site.id,
                status: site.status === 'active' ? 'suspended' : 'active'
            })} className="text-gray-400 hover:text-gray-600" title={site.status === 'active' ? 'Suspend Site' : 'Activate Site'}>
                        {site.status === 'active' ? (<lucide_react_1.Pause className="h-4 w-4"/>) : (<lucide_react_1.Play className="h-4 w-4"/>)}
                      </button>
                      <button onClick={() => {
                if (confirm('Are you sure you want to delete this site?')) {
                    deleteSite.mutate(site.id);
                }
            }} className="text-red-400 hover:text-red-600" title="Delete Site">
                        <lucide_react_1.Trash2 className="h-4 w-4"/>
                      </button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      
      {showAddModal && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Site</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Domain</label>
                  <input type="text" className="input mt-1" placeholder="example.com"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PHP Version</label>
                  <select className="input mt-1">
                    <option value="8.2">PHP 8.2</option>
                    <option value="8.1">PHP 8.1</option>
                    <option value="8.0">PHP 8.0</option>
                    <option value="7.4">PHP 7.4</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="ssl" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"/>
                  <label htmlFor="ssl" className="ml-2 block text-sm text-gray-900">
                    Enable SSL
                  </label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Site
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=Sites.js.map