import { Grid, Typography } from '@mui/material'
import React from 'react'

const CommonGrid = ({ children, title }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CommonGrid
