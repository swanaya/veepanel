"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const axios_1 = require("axios");
function Settings() {
    const queryClient = (0, react_query_1.useQueryClient)();
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const { data: settings, isLoading } = (0, react_query_1.useQuery)({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await axios_1.default.get('http://localhost:4000/settings');
            return response.data;
        }
    });
    const updateSettings = (0, react_query_1.useMutation)({
        mutationFn: async (newSettings) => {
            const response = await axios_1.default.put('http://localhost:4000/settings', newSettings);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
            setIsEditing(false);
        }
    });
    const handleSave = (formData) => {
        const newSettings = {
            panel: {
                name: formData.get('panelName'),
                domain: formData.get('panelDomain'),
                port: parseInt(formData.get('panelPort')),
                ssl: formData.get('panelSSL') === 'true'
            },
            database: {
                host: formData.get('dbHost'),
                port: parseInt(formData.get('dbPort')),
                name: formData.get('dbName'),
                username: formData.get('dbUsername')
            },
            email: {
                host: formData.get('emailHost'),
                port: parseInt(formData.get('emailPort')),
                username: formData.get('emailUsername'),
                secure: formData.get('emailSecure') === 'true'
            },
            security: {
                sessionTimeout: parseInt(formData.get('sessionTimeout')),
                maxLoginAttempts: parseInt(formData.get('maxLoginAttempts')),
                require2FA: formData.get('require2FA') === 'true'
            }
        };
        updateSettings.mutate(newSettings);
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage panel configuration and preferences</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (<>
              <button onClick={() => setIsEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button form="settings-form" type="submit" className="btn-primary" disabled={updateSettings.isPending}>
                {updateSettings.isPending ? (<lucide_react_1.RefreshCw className="h-4 w-4 mr-2 animate-spin"/>) : (<lucide_react_1.Save className="h-4 w-4 mr-2"/>)}
                Save Changes
              </button>
            </>) : (<button onClick={() => setIsEditing(true)} className="btn-primary">
              Edit Settings
            </button>)}
        </div>
      </div>

      <form id="settings-form" onSubmit={(e) => {
            e.preventDefault();
            handleSave(new FormData(e.currentTarget));
        }}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <lucide_react_1.Globe className="h-5 w-5 text-blue-600 mr-2"/>
                <h3 className="text-lg font-medium text-gray-900">Panel Settings</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Panel Name</label>
                <input type="text" name="panelName" defaultValue={settings?.panel.name} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <input type="text" name="panelDomain" defaultValue={settings?.panel.domain} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Port</label>
                <input type="number" name="panelPort" defaultValue={settings?.panel.port} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="panelSSL" defaultChecked={settings?.panel.ssl} disabled={!isEditing} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"/>
                <label className="ml-2 block text-sm text-gray-900">Enable SSL</label>
              </div>
            </div>
          </div>

          
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <lucide_react_1.Database className="h-5 w-5 text-green-600 mr-2"/>
                <h3 className="text-lg font-medium text-gray-900">Database Settings</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Host</label>
                <input type="text" name="dbHost" defaultValue={settings?.database.host} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Port</label>
                <input type="number" name="dbPort" defaultValue={settings?.database.port} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Database Name</label>
                <input type="text" name="dbName" defaultValue={settings?.database.name} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" name="dbUsername" defaultValue={settings?.database.username} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
            </div>
          </div>

          
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <lucide_react_1.Mail className="h-5 w-5 text-purple-600 mr-2"/>
                <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                <input type="text" name="emailHost" defaultValue={settings?.email.host} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                <input type="number" name="emailPort" defaultValue={settings?.email.port} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input type="text" name="emailUsername" defaultValue={settings?.email.username} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="emailSecure" defaultChecked={settings?.email.secure} disabled={!isEditing} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"/>
                <label className="ml-2 block text-sm text-gray-900">Use Secure Connection</label>
              </div>
            </div>
          </div>

          
          <div className="card">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <lucide_react_1.Shield className="h-5 w-5 text-red-600 mr-2"/>
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                <input type="number" name="sessionTimeout" defaultValue={settings?.security.sessionTimeout} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
                <input type="number" name="maxLoginAttempts" defaultValue={settings?.security.maxLoginAttempts} disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-100"/>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="require2FA" defaultChecked={settings?.security.require2FA} disabled={!isEditing} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"/>
                <label className="ml-2 block text-sm text-gray-900">Require 2FA for Admin</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>);
}
//# sourceMappingURL=Settings.js.map