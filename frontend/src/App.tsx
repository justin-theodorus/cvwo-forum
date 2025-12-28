import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider, useDispatch } from 'react-redux'
import { store, type AppDispatch } from './store'
import { theme } from './theme/theme'
import { AppRouter } from './routes'
import { getCurrentUser } from './store/authSlice'

function AppContent () {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(getCurrentUser())
    }
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

function App () {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
