import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, Plus, Trash2, Send, Inbox } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface EmailAccount {
  id: string
  email: string
  domain: string
  quota: number
  used: number
  status: 'active' | 'suspended'
  createdAt: string
}

export default function Email() {
  const [showAddModal, setShowAddModal] = useState(false)
  const queryClient = useQueryClient()

  const { data: emails = [], isLoading } = useQuery<EmailAccount[]>({
    queryKey: ['emails'],
    queryFn: async (): Promise<EmailAccount[]> => {
      const response = await axios.get('http://localhost:4000/email/accounts')
      return response.data as EmailAccount[]
    }
  })

  const deleteEmail = useMutation({
    mutationFn: async (emailId: string) => {
      await axios.delete(`http://localhost:4000/email/accounts/${emailId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emails'] })
      toast.success('Email account deleted')
    },
    onError: () => {
      toast.error('Failed to delete email account')
    },
  })

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
          <h1 className="text-2xl font-bold text-gray-900">Email</h1>
          <p className="text-gray-600">Manage email accounts and settings</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Email Account
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Accounts</p>
              <p className="text-2xl font-semibold text-gray-900">{emails.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <Send className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Accounts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {emails.filter((email: EmailAccount) => email.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
              <Inbox className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Storage</p>
              <p className="text-2xl font-semibold text-gray-900">
                {emails.reduce((total: number, email: EmailAccount) => total + email.quota, 0)} MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Accounts Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Email Accounts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage Used
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
              {emails.map((email: EmailAccount) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{email.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {email.domain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      email.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${(email.used / email.quota) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">
                        {email.used} / {email.quota} MB
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(email.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Edit button placeholder, implement modal if needed */}
                      {/* <button
                        onClick={() => setSelectedSite(email)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Edit Email"
                      >
                        <Edit className="h-4 w-4" />
                      </button> */}
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this email account?')) {
                            deleteEmail.mutate(email.id)
                          }
                        }}
                        className="text-red-400 hover:text-red-600"
                        title="Delete Email"
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

      {/* Add Email Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Email Account</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="input mt-1"
                    placeholder="user@domain.com"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Storage Quota (MB)</label>
                  <input
                    type="number"
                    className="input mt-1"
                    placeholder="1000"
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
                    Create Account
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