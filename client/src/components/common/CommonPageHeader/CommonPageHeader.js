import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

const CommonPageHeader = ({ title, children }) => {
  return (
    <Box>
      <Typography sx={{ marginBottom: '10px' }} variant="h5">
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommonPageHeader
