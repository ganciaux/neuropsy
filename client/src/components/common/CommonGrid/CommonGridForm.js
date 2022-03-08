import { Grid } from '@mui/material'
import React from 'react'

const CommonGridForm = ({ children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={1}>
            {children}
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default CommonGridForm
