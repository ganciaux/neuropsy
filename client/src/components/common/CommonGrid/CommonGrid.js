import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'

const CommonGrid = ({ children, title, path }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" component="div">
          {title}
          {path && (
            <IconButton href={path} aria-label="afficher" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CommonGrid
