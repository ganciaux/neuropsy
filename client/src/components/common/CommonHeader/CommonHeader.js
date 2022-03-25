import React from 'react'
import { Typography } from '@mui/material'

const CommonHeader = ({ title }) => {
  return (
    <Typography sx={{ marginBottom: '10px' }} variant="h5">
      {title}
    </Typography>
  )
}

export default CommonHeader
