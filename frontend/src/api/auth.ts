import client from './client'
import type { User } from '../types/models'

interface LoginRequest {
  username: string
  password: string
}

interface RegisterRequest {
  username: string
  email: string
  password: string
}

interface AuthResponse {
  token: string
  user: User
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await client.post('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await client.post('/auth/register', data)
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await client.get('/auth/me')
    return response.data
  }
}

