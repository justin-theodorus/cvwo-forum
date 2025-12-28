import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout () {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet /> {/* placeholder for current page content */}
      </Box>
    </Box>
  )
}

