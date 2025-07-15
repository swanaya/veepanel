import { useQuery } from '@tanstack/react-query'
import {
  Globe,
  Database,
  Mail,
  HardDrive,
  Cpu,
  MemoryStick,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import axios from 'axios'

interface SystemStats {
  cpu: number
  memory: number
  disk: number
  network: {
    rx: number
    tx: number
  }
}

interface SiteStats {
  total: number
  active: number
  suspended: number
}

interface DatabaseStats {
  total: number
  mysql: number
  postgresql: number
  mongodb: number
}

export default function Dashboard() {
  const { data: systemStats } = useQuery<SystemStats>({
    queryKey: ['systemStats'],
    queryFn: async (): Promise<SystemStats> => {
      const response = await axios.get<SystemStats>('http://localhost:4000/system/stats')
      return response.data
    },
    refetchInterval: 5000
  })

  const { data: siteStats } = useQuery<SiteStats>({
    queryKey: ['siteStats'],
    queryFn: async (): Promise<SiteStats> => {
      const response = await axios.get<SiteStats>('http://localhost:4000/sites/stats')
      return response.data
    }
  })

  const { data: dbStats } = useQuery<DatabaseStats>({
    queryKey: ['dbStats'],
    queryFn: async (): Promise<DatabaseStats> => {
      const response = await axios.get<DatabaseStats>('http://localhost:4000/databases/stats')
      return response.data
    }
  })

  const stats = [
    {
      name: 'Active Sites',
      value: siteStats?.active || 0,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Databases',
      value: dbStats?.total || 0,
      icon: Database,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Email Accounts',
      value: 12,
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Backups',
      value: 8,
      icon: HardDrive,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: systemStats?.cpu || 0,
      icon: Cpu,
      unit: '%',
      color: systemStats?.cpu && systemStats.cpu > 80 ? 'text-red-600' : 'text-gray-600',
    },
    {
      name: 'Memory Usage',
      value: systemStats?.memory || 0,
      icon: MemoryStick,
      unit: '%',
      color: systemStats?.memory && systemStats.memory > 80 ? 'text-red-600' : 'text-gray-600',
    },
    {
      name: 'Disk Usage',
      value: systemStats?.disk || 0,
      icon: HardDrive,
      unit: '%',
      color: systemStats?.disk && systemStats.disk > 90 ? 'text-red-600' : 'text-gray-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">System overview and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {systemMetrics.map((metric) => (
          <div key={metric.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <metric.icon className={`h-5 w-5 ${metric.color} mr-2`} />
                <span className="text-sm font-medium text-gray-500">{metric.name}</span>
              </div>
              <span className={`text-lg font-semibold ${metric.color}`}>
                {metric.value}{metric.unit}
              </span>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    metric.value > 80 ? 'bg-red-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Site "example.com" created</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Database backup completed</p>
                <p className="text-xs text-gray-500">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">SSL certificate expiring soon</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email account "user@domain.com" created</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="btn-primary">
              <Globe className="h-4 w-4 mr-2" />
              Add Site
            </button>
            <button className="btn-secondary">
              <Database className="h-4 w-4 mr-2" />
              Create Database
            </button>
            <button className="btn-secondary">
              <Mail className="h-4 w-4 mr-2" />
              Add Email
            </button>
            <button className="btn-secondary">
              <HardDrive className="h-4 w-4 mr-2" />
              Create Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 