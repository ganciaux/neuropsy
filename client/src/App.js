import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Grid from '@mui/material/Grid'
import { makeStyles } from '@mui/styles'
import { userContext } from './AppContext'
import { isLoggedIn } from './api/api'
import UserLogin from './pages/Users/UserLogin'
import CommonLoader from './components/common/CommonLoader/CommonLoader'
import CommonAlert from './components/common/CommonAlert/CommonAlert'

export const useStyles = makeStyles((theme) => ({
  gridWrapperStyles: {
    position: 'relative',
    paddingTop: '80px',
    paddingLeft: ({ user }) => (user ? '200px' : '20px'),
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
  const [user, setUser] = useState(null)
  const classes = useStyles({ user })
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const { status, data, error, isLoading, refetch, isSuccess } = useQuery(
    'isLoggin',
    isLoggedIn,
    {
      onSuccess: (data) => {
        setUser(data.id)
      },
      retry: false,
    },
  )

  const render = () => {
    if (isLoading) {
      return <CommonLoader />
    }
    if (error) {
      return (
        <Grid className={classes.gridWrapperStyles}>
          <UserLogin />
        </Grid>
      )
    }
    if (isSuccess) {
      if (user) {
        return (
          <>
            <Navbar />
            <Grid className={classes.gridWrapperStyles}>
              <Outlet />
            </Grid>
          </>
        )
      } else {
        return (
          <Grid className={classes.gridWrapperStyles}>
            <UserLogin />
          </Grid>
        )
      }
    }
  }

  return (
    <userContext.Provider value={user}>
      <Grid container>
        <Header />
        {render()}
      </Grid>
    </userContext.Provider>
  )
}

export default App
