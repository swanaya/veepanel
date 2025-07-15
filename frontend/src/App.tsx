import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Sites from './pages/Sites'
import Databases from './pages/Databases'
import Email from './pages/Email'
import SSL from './pages/SSL'
import Backup from './pages/Backup'
import System from './pages/System'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Setup from './pages/Setup'
import Layout from './components/Layout'
import './index.css'

const queryClient = new QueryClient()

// Extend the User interface to include setup fields
interface ExtendedUser {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  permissions: string[]
  forcePasswordChange?: boolean
  isTemporaryEmail?: boolean
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check if user needs to complete setup
  const extendedUser = user as ExtendedUser
  if (extendedUser.forcePasswordChange || extendedUser.isTemporaryEmail) {
    return <Navigate to="/setup" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/setup" element={
        <ProtectedRoute>
          <Setup />
        </ProtectedRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="sites" element={<Sites />} />
              <Route path="databases" element={<Databases />} />
              <Route path="email" element={<Email />} />
              <Route path="ssl" element={<SSL />} />
              <Route path="backup" element={<Backup />} />
              <Route path="system" element={<System />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  )
}

export default App
