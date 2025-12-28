import { Container, Paper, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterForm } from '../components/forms/RegisterForm'
import { register } from '../store/authSlice'
import type { AppDispatch, RootState } from '../store'

export function RegisterPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)

  const handleRegister = async (username: string, email: string, password: string) => {
    const result = await dispatch(register({ username, email, password }))
    if (register.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Paper>
    </Container>
  )
}

