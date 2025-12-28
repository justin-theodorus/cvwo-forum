import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import type { User } from '../types/models'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const response = await authApi.login(credentials)
    localStorage.setItem('token', response.token)
    return response
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (data: { username: string; email: string; password: string }) => {
    const response = await authApi.register(data)
    localStorage.setItem('token', response.token)
    return response
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const user = await authApi.getCurrentUser()
    return user
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { // syncrhounsous
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => { // async
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Registration failed'
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer

