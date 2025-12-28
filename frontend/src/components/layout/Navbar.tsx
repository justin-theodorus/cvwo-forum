import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { logout } from '../../store/authSlice'

export function Navbar () {
  const dispatch = useDispatch() // sends action to Redux store
  const { isAuthenticated, user } = useSelector<RootState, { isAuthenticated: boolean; user: { id: number; username: string; email: string } | null }>((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          CVWO Forum
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/topics">
            Topics
          </Button>
          {isAuthenticated ? (
            <>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                {user?.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

