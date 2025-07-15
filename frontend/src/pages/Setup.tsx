import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { 
  Shield, 
  Mail, 
  Lock, 
  Smartphone, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface SetupData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  newEmail: string
  enable2FA: boolean
}

export default function Setup() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const queryClient = useQueryClient()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<SetupData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
    enable2FA: true
  })

  const updateSetup = useMutation({
    mutationFn: async (data: SetupData) => {
      const response = await axios.post('http://localhost:4000/auth/setup', data)
      return response.data
    },
    onSuccess: () => {
      toast.success('Setup completed successfully!')
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate('/dashboard')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Setup failed')
    }
  })

  const handleInputChange = (field: keyof SetupData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    updateSetup.mutate(formData)
  }

  const steps = [
    {
      id: 1,
      title: 'Change Password',
      description: 'Set a secure password for your account',
      icon: Lock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Update Email',
      description: 'Change from temporary email to your real email',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Enable 2FA',
      description: 'Add two-factor authentication for extra security',
      icon: Smartphone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <Shield className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Setup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Secure your account with a new password, email, and 2FA
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex-shrink-0 ${step.bgColor} p-2 rounded-full`}>
                <step.icon className={`h-5 w-5 ${step.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              <div className="flex-shrink-0">
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : currentStep === step.id ? (
                  <div className="h-5 w-5 rounded-full bg-primary-600 animate-pulse" />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-gray-300" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Security Notice
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                You are using temporary credentials. Please complete this setup to secure your account.
              </p>
            </div>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Change Password */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  required
                  className="input pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  required
                  className="input pr-10"
                  placeholder="Enter new password (min 8 characters)"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className="input pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Update Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Email Address
            </label>
            <input
              type="email"
              value={formData.newEmail}
              onChange={(e) => handleInputChange('newEmail', e.target.value)}
              required
              className="input mt-1"
              placeholder="Enter your real email address"
            />
            <p className="mt-1 text-xs text-gray-500">
              Current: {user?.email} (temporary)
            </p>
          </div>

          {/* Step 3: Enable 2FA */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.enable2FA}
              onChange={(e) => handleInputChange('enable2FA', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Enable Two-Factor Authentication (Recommended)
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={updateSetup.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateSetup.isPending ? 'Completing Setup...' : 'Complete Setup'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip for now (not recommended)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 