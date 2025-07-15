"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SSL;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const axios_1 = require("axios");
const react_hot_toast_1 = require("react-hot-toast");
function SSL() {
    const [showAddModal, setShowAddModal] = (0, react_1.useState)(false);
    const queryClient = (0, react_query_1.useQueryClient)();
    const { data: certificates, isLoading } = (0, react_query_1.useQuery)('ssl', async () => {
        const response = await axios_1.default.get('http://localhost:4000/ssl/certificates');
        return response.data;
    });
    const renewCertificate = (0, react_query_1.useMutation)(async (certId) => {
        const response = await axios_1.default.post(`http://localhost:4000/ssl/certificates/${certId}/renew`);
        return response.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('ssl');
            react_hot_toast_1.default.success('SSL certificate renewed');
        },
        onError: () => {
            react_hot_toast_1.default.error('Failed to renew SSL certificate');
        },
    });
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100';
            case 'expired':
                return 'text-red-600 bg-red-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <lucide_react_1.CheckCircle className="h-4 w-4"/>;
            case 'expired':
                return <lucide_react_1.AlertTriangle className="h-4 w-4"/>;
            case 'pending':
                return <lucide_react_1.Clock className="h-4 w-4"/>;
            default:
                return <lucide_react_1.Clock className="h-4 w-4"/>;
        }
    };
    const isExpiringSoon = (expiresAt) => {
        const expiryDate = new Date(expiresAt);
        const now = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SSL Certificates</h1>
          <p className="text-gray-600">Manage SSL certificates and security</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
          Add Certificate
        </button>
      </div>

      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <lucide_react_1.Shield className="h-6 w-6 text-green-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Certificates</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates?.filter(cert => cert.status === 'active').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
              <lucide_react_1.AlertTriangle className="h-6 w-6 text-red-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Expired Certificates</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates?.filter(cert => cert.status === 'expired').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-lg">
              <lucide_react_1.Clock className="h-6 w-6 text-yellow-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-semibold text-gray-900">
                {certificates?.filter(cert => isExpiringSoon(cert.expiresAt)).length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <lucide_react_1.Shield className="h-6 w-6 text-blue-600"/>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Certificates</p>
              <p className="text-2xl font-semibold text-gray-900">{certificates?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">SSL Certificates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auto Renew
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates?.map((cert) => (<tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <lucide_react_1.Shield className="h-4 w-4 text-gray-400 mr-2"/>
                      <span className="text-sm font-medium text-gray-900">{cert.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cert.provider === 'letsencrypt' ? 'Let\'s Encrypt' : 'Custom'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                      {getStatusIcon(cert.status)}
                      <span className="ml-1 capitalize">{cert.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={isExpiringSoon(cert.expiresAt) ? 'text-red-600 font-medium' : ''}>
                      {new Date(cert.expiresAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cert.autoRenew ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {cert.autoRenew ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {cert.status === 'expired' && (<button onClick={() => renewCertificate.mutate(cert.id)} className="text-blue-400 hover:text-blue-600" title="Renew Certificate">
                          <lucide_react_1.CheckCircle className="h-4 w-4"/>
                        </button>)}
                      <button onClick={() => setSelectedSite(cert)} className="text-gray-400 hover:text-gray-600" title="Edit Certificate">
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button>
                      <button onClick={() => {
                if (confirm('Are you sure you want to delete this certificate?')) {
                }
            }} className="text-red-400 hover:text-red-600" title="Delete Certificate">
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add SSL Certificate</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Domain</label>
                  <input type="text" className="input mt-1" placeholder="example.com"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provider</label>
                  <select className="input mt-1">
                    <option value="letsencrypt">Let's Encrypt (Free)</option>
                    <option value="custom">Custom Certificate</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="autoRenew" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"/>
                  <label htmlFor="autoRenew" className="ml-2 block text-sm text-gray-900">
                    Auto-renew certificate
                  </label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Certificate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=SSL.js.map