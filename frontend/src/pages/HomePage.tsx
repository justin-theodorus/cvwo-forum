import { Container, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export function HomePage () {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to CVWO Forum
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A place to discuss topics and share ideas
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/topics')}
          >
            Browse Topics
          </Button>
          {!isAuthenticated && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  )
}

