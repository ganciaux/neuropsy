import React from 'react'
import { Grid } from '@mui/material'

const CommonGridLine = ({ label, value }) => {
  return (
    <Grid item xs={12}>
      <span>{label}: </span>
      <span>{value}</span>
    </Grid>
  )
}

export default CommonGridLine
