import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useStyles } from './styles'
import { userContext } from '../../AppContext'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { delay, logout } from '../../api/api'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const Header = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const user = useContext(userContext)
  const { status, data, error, refetch, isSuccess } = useQuery(
    'logout',
    logout,
    {
      onSuccess: (data) => {
        window.location.reload('/login')
      },
      enabled: false,
    },
  )

  const handleLogout = async () => {
    refetch()
  }

  return (
    <AppBar position="fixed" className={classes.positionFixed}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Clients
        </Typography>
        <div>
          {user ? (
            <IconButton
              size="large"
              aria-label="logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleLogout()}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              aria-label="login"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate('/login')}
            >
              <LoginIcon />
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
