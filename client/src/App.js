import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import { userContext } from './AppContext'
import { isLoggedIn } from './api/api'

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
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = isLoggedIn()
    //setUser(localStorage.getItem('token'))
    setUser(data)
  }, [])

  return (
    <userContext.Provider value={user}>
      <Grid container>
        <Header />
        <Navbar />
        <Grid className={classes.gridWrapperStyles}>
          <Outlet />
        </Grid>
      </Grid>
    </userContext.Provider>
  )
}

export default App
