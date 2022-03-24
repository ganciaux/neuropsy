import React from 'react'
import Header from '../Header/Header'
import { Grid } from '@mui/material'

const CommonPageHeader = ({ title, children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}

export default CommonPageHeader
