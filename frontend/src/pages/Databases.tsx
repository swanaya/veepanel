import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Database, Plus, Edit, Trash2, Eye, EyeOff, Copy } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface DatabaseItem {
  id: string
  name: string
  type: 'mysql' | 'postgresql' | 'mongodb'
  host: string
  port: number
  username: string
  password: string
  size: number
  createdAt: string
}

export default function Databases() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const queryClient = useQueryClient()

  const { data: databases, isLoading } = useQuery<DatabaseItem[]>(
    'databases',
    async () => {
      const response = await axios.get('http://localhost:4000/databases')
      return response.data
    }
  )

  const deleteDatabase = useMutation(
    async (dbId: string) => {
      await axios.delete(`http://localhost:4000/databases/${dbId}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('databases')
        toast.success('Database deleted')
      },
      onError: () => {
        toast.error('Failed to delete database')
      },
    }
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mysql':
        return 'text-blue-600 bg-blue-100'
      case 'postgresql':
        return 'text-purple-600 bg-purple-100'
      case 'mongodb':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Databases</h1>
          <p className="text-gray-600">Manage your databases</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Database
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Databases</p>
              <p className="text-2xl font-semibold text-gray-900">{databases?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">MySQL</p>
              <p className="text-2xl font-semibold text-gray-900">
                {databases?.filter(db => db.type === 'mysql').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
              <Database className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">PostgreSQL</p>
              <p className="text-2xl font-semibold text-gray-900">
                {databases?.filter(db => db.type === 'postgresql').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">MongoDB</p>
              <p className="text-2xl font-semibold text-gray-900">
                {databases?.filter(db => db.type === 'mongodb').length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Databases Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Databases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Host
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {databases?.map((db) => (
                <tr key={db.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{db.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(db.type)}`}>
                      {db.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {db.host}:{db.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {db.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">
                        {showPassword[db.id] ? db.password : '••••••••'}
                      </span>
                      <button
                        onClick={() => setShowPassword(prev => ({ ...prev, [db.id]: !prev[db.id] }))}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword[db.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(db.password)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {db.size} MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedSite(db)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Edit Database"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this database?')) {
                            deleteDatabase.mutate(db.id)
                          }
                        }}
                        className="text-red-400 hover:text-red-600"
                        title="Delete Database"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Database Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Database</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Database Name</label>
                  <input
                    type="text"
                    className="input mt-1"
                    placeholder="mydatabase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select className="input mt-1">
                    <option value="mysql">MySQL</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mongodb">MongoDB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    className="input mt-1"
                    placeholder="dbuser"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className="input mt-1"
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Database
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 