import { useQuery } from '@tanstack/react-query'
import { Cpu, MemoryStick, HardDrive, Activity, Server, Wifi, Thermometer } from 'lucide-react'
import axios from 'axios'

interface SystemInfo {
  cpu: {
    usage: number
    cores: number
    model: string
  }
  memory: {
    total: number
    used: number
    available: number
  }
  disk: {
    total: number
    used: number
    available: number
  }
  network: {
    rx: number
    tx: number
    interfaces: Array<{
      name: string
      ip: string
      status: string
    }>
  }
  uptime: number
  loadAverage: number[]
  temperature: number
}

export default function System() {
  const { data: systemInfo, isLoading } = useQuery<SystemInfo>({
    queryKey: ['systemInfo'],
    queryFn: async (): Promise<SystemInfo> => {
      const response = await axios.get<SystemInfo>('http://localhost:4000/system/info')
      return response.data
    },
    refetchInterval: 5000
  })

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Monitor</h1>
        <p className="text-gray-600">Real-time system performance and statistics</p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Cpu className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">CPU Usage</p>
              <p className="text-2xl font-semibold text-gray-900">
                {systemInfo?.cpu.usage || 0}%
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  (systemInfo?.cpu.usage || 0) > 80 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${systemInfo?.cpu.usage || 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <MemoryStick className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Memory Usage</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(((systemInfo?.memory.used || 0) / (systemInfo?.memory.total || 1)) * 100)}%
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  ((systemInfo?.memory.used || 0) / (systemInfo?.memory.total || 1)) * 100 > 80 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${((systemInfo?.memory.used || 0) / (systemInfo?.memory.total || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
              <HardDrive className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Disk Usage</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(((systemInfo?.disk.used || 0) / (systemInfo?.disk.total || 1)) * 100)}%
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  ((systemInfo?.disk.used || 0) / (systemInfo?.disk.total || 1)) * 100 > 90 ? 'bg-red-500' : 'bg-purple-500'
                }`}
                style={{ width: `${((systemInfo?.disk.used || 0) / (systemInfo?.disk.total || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg">
              <Thermometer className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Temperature</p>
              <p className="text-2xl font-semibold text-gray-900">
                {systemInfo?.temperature || 0}°C
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed System Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CPU Information */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">CPU Information</h3>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="text-sm text-gray-900">{systemInfo?.cpu.model || 'Unknown'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Cores</dt>
                <dd className="text-sm text-gray-900">{systemInfo?.cpu.cores || 0}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Load Average</dt>
                <dd className="text-sm text-gray-900">
                  {systemInfo?.loadAverage?.map((load, index) => `${load.toFixed(2)}`).join(', ') || 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Memory Information */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Memory Information</h3>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Memory</dt>
                <dd className="text-sm text-gray-900">{formatBytes(systemInfo?.memory.total || 0)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Used Memory</dt>
                <dd className="text-sm text-gray-900">{formatBytes(systemInfo?.memory.used || 0)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Available Memory</dt>
                <dd className="text-sm text-gray-900">{formatBytes(systemInfo?.memory.available || 0)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Disk Information */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Disk Information</h3>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Space</dt>
                <dd className="text-sm text-gray-900">{formatBytes(systemInfo?.disk.total || 0)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Used Space</dt>
                <dd className="text-sm text-gray-900">{formatBytes(systemInfo?.disk.used || 0)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Available Space</dt>
                <dd className="text-sm text-gray-900">{formatBytes(systemInfo?.disk.available || 0)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Network Information */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Network Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Network Interfaces</h4>
                <div className="space-y-3">
                  {systemInfo?.network.interfaces?.map((iface, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{iface.name}</p>
                        <p className="text-xs text-gray-500">{iface.ip}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        iface.status === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {iface.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-4">Network Traffic</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-500">Download</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatBytes(systemInfo?.network.rx || 0)}/s
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-500">Upload</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatBytes(systemInfo?.network.tx || 0)}/s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center">
              <Server className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Uptime</p>
                <p className="text-sm text-gray-500">{formatUptime(systemInfo?.uptime || 0)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Status</p>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Temperature</p>
                <p className="text-sm text-gray-500">{systemInfo?.temperature || 0}°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 