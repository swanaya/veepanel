import { useState, useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  permissions: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          const response = await axios.post('http://localhost:4000/auth/login', {
            email,
            password,
          })
          
          const { user, token } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
          
          // Set default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        delete axios.defaults.headers.common['Authorization']
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)

export const useAuth = () => {
  const auth = useAuthStore()
  
  useEffect(() => {
    // Check if token exists and validate it
    if (auth.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
      // You can add token validation here
      auth.setLoading(false)
    } else {
      auth.setLoading(false)
    }
  }, [])
  
  return auth
} 