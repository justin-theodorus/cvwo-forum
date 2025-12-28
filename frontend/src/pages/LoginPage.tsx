import { Container, Paper } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm } from '../components/forms/LoginForm'
import { login } from '../store/authSlice'
import type { AppDispatch, RootState } from '../store'
import { Typography } from '@mui/material'

export function LoginPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)

  const handleLogin = async (username: string, password: string) => {
    const result = await dispatch(login({ username, password }))
    if (login.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Container>
  )
}

