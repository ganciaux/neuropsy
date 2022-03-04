import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useStyles } from './styles'

const Header = () => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.positionFixed}>
      <Toolbar>
        <Typography variant="h6">Client</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
