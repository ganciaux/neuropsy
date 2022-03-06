import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  gridWrapperStyles: {
    position: 'relative',
    paddingTop: '80px',
    paddingLeft: '200px',
    paddingRight: '20px',
    minHeight: 'calc(100vh)',
    textAlign: 'justify',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '70px',
      paddingLeft: '70px',
    },
    width: '100%',
  },
}))

function App() {
  const classes = useStyles()

  return (
    <Grid container>
      <Header />
      <Navbar />
      <Grid className={classes.gridWrapperStyles}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default App
