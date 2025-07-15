import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { HardDrive, Plus, Download, Trash2, Play, Clock, CheckCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Backup {
  id: string
  name: string
  type: 'full' | 'incremental' | 'database'
  size: number
  status: 'completed' | 'running' | 'failed'
  createdAt: string
  retention: number
}

export default function Backup() {
  const [showAddModal, setShowAddModal] = useState(false)
  const queryClient = useQueryClient()

  const { data: backups, isLoading } = useQuery<Backup[]>(
    'backups',
    async () => {
      const response = await axios.get('http://localhost:4000/backup')
      return response.data
    }
  )

  const createBackup = useMutation(
    async (data: { name: string; type: string }) => {
      const response = await axios.post('http://localhost:4000/backup', data)
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('backups')
        toast.success('Backup started')
      },
      onError: () => {
        toast.error('Failed to start backup')
      },
    }
  )

  const downloadBackup = useMutation(
    async (backupId: string) => {
      const response = await axios.get(`http://localhost:4000/backup/${backupId}/download`, {
        responseType: 'blob'
      })
      return response.data
    },
    {
      onSuccess: (data, backupId) => {
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `backup-${backupId}.zip`)
        document.body.appendChild(link)
        link.click()
        link.remove()
        toast.success('Backup downloaded')
      },
      onError: () => {
        toast.error('Failed to download backup')
      },
    }
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'running':
        return 'text-blue-600 bg-blue-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'running':
        return <Play className="h-4 w-4" />
      case 'failed':
        return <Trash2 className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
          <h1 className="text-2xl font-bold text-gray-900">Backups</h1>
          <p className="text-gray-600">Manage system and site backups</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Backup
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {backups?.filter(backup => backup.status === 'completed').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Running</p>
              <p className="text-2xl font-semibold text-gray-900">
                {backups?.filter(backup => backup.status === 'running').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Failed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {backups?.filter(backup => backup.status === 'failed').length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
              <HardDrive className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Size</p>
              <p className="text-2xl font-semibold text-gray-900">
                {backups?.reduce((total, backup) => total + backup.size, 0) || 0} MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Backups Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Backup History</h3>
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Retention
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups?.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <HardDrive className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{backup.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      backup.type === 'full' ? 'bg-blue-100 text-blue-800' :
                      backup.type === 'incremental' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                      {getStatusIcon(backup.status)}
                      <span className="ml-1 capitalize">{backup.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {backup.size} MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(backup.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {backup.retention} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {backup.status === 'completed' && (
                        <button
                          onClick={() => downloadBackup.mutate(backup.id)}
                          className="text-blue-400 hover:text-blue-600"
                          title="Download Backup"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this backup?')) {
                            // deleteBackup.mutate(backup.id)
                          }
                        }}
                        className="text-red-400 hover:text-red-600"
                        title="Delete Backup"
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

      {/* Create Backup Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Backup</h3>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                createBackup.mutate({
                  name: formData.get('name') as string,
                  type: formData.get('type') as string
                })
                setShowAddModal(false)
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Backup Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input mt-1"
                    placeholder="backup-2024-01-01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Backup Type</label>
                  <select name="type" className="input mt-1" required>
                    <option value="full">Full Backup</option>
                    <option value="incremental">Incremental Backup</option>
                    <option value="database">Database Only</option>
                  </select>
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
                    Create Backup
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