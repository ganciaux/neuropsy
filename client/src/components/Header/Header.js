import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useStyles } from './styles'
import { userContext } from '../../AppContext'

const Header = () => {
  const classes = useStyles()
  const user = useContext(userContext)
  return (
    <AppBar position="fixed" className={classes.positionFixed}>
      <Toolbar>
        <Typography variant="h6">
          Client {user ? ': Logged' : ': Login'} {JSON.stringify(user)}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
