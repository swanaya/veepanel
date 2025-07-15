"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Users;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const axios_1 = require("axios");
function Users() {
    const queryClient = (0, react_query_1.useQueryClient)();
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const [showCreateModal, setShowCreateModal] = (0, react_1.useState)(false);
    const [editingUser, setEditingUser] = (0, react_1.useState)(null);
    const { data: users, isLoading } = (0, react_query_1.useQuery)({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios_1.default.get('http://localhost:4000/users');
            return response.data;
        }
    });
    const createUser = (0, react_query_1.useMutation)({
        mutationFn: async (userData) => {
            const response = await axios_1.default.post('http://localhost:4000/users', userData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setShowCreateModal(false);
        }
    });
    const updateUser = (0, react_query_1.useMutation)({
        mutationFn: async ({ id, data }) => {
            const response = await axios_1.default.put(`http://localhost:4000/users/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setEditingUser(null);
        }
    });
    const deleteUser = (0, react_query_1.useMutation)({
        mutationFn: async (userId) => {
            await axios_1.default.delete(`http://localhost:4000/users/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
    const filteredUsers = users?.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())) || [];
    const stats = [
        {
            name: 'Total Users',
            value: users?.length || 0,
            icon: lucide_react_1.User,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
        },
        {
            name: 'Active Users',
            value: users?.filter(user => user.status === 'active').length || 0,
            icon: lucide_react_1.Shield,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
        },
        {
            name: 'Suspended Users',
            value: users?.filter(user => user.status === 'suspended').length || 0,
            icon: lucide_react_1.Shield,
            color: 'text-red-600',
            bgColor: 'bg-red-100',
        },
        {
            name: 'Admins',
            value: users?.filter(user => user.role === 'admin').length || 0,
            icon: lucide_react_1.User,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
        },
    ];
    const handleCreateUser = (formData) => {
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            role: formData.get('role'),
            status: formData.get('status')
        };
        createUser.mutate(userData);
    };
    const handleUpdateUser = (formData) => {
        if (!editingUser)
            return;
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            role: formData.get('role'),
            status: formData.get('status')
        };
        updateUser.mutate({ id: editingUser._id, data: userData });
    };
    const handleDeleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            deleteUser.mutate(userId);
        }
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
          Add User
        </button>
      </div>

      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (<div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`}/>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>))}
      </div>

      
      <div className="card">
        <div className="p-6">
          <div className="relative">
            <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
            <input type="text" placeholder="Search users by name, email, or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"/>
          </div>
        </div>
      </div>

      
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">User Accounts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resources
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (<tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <lucide_react_1.User className="h-5 w-5 text-gray-600"/>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                user.role === 'reseller' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="space-y-1">
                      <div>Sites: {user.sites}</div>
                      <div>DBs: {user.databases}</div>
                      <div>Email: {user.emailAccounts}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => setEditingUser(user)} className="text-primary-600 hover:text-primary-900">
                        <lucide_react_1.Edit className="h-4 w-4"/>
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">
                        <lucide_react_1.Trash2 className="h-4 w-4"/>
                      </button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      
      {showCreateModal && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New User</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser(new FormData(e.currentTarget));
            }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                      <option value="user">User</option>
                      <option value="reseller">Reseller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={createUser.isPending}>
                    {createUser.isPending ? 'Creating...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}

      
      {editingUser && (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit User</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUser(new FormData(e.currentTarget));
            }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" defaultValue={editingUser.username} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" defaultValue={editingUser.email} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select name="role" defaultValue={editingUser.role} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                      <option value="user">User</option>
                      <option value="reseller">Reseller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" defaultValue={editingUser.status} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button type="button" onClick={() => setEditingUser(null)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={updateUser.isPending}>
                    {updateUser.isPending ? 'Updating...' : 'Update User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=Users.js.map