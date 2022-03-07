import { Grid } from '@mui/material'
import React from 'react'

const CommonGridForm = ({ children }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              {children}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default CommonGridForm
