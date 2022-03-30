import { Typography } from '@mui/material'
import React from 'react'

const CommonHeader = ({ title }) => {
  return (
    <Typography sx={{ marginBottom: '5px' }} variant="h5">
      {title}
    </Typography>
  )
}

export default CommonHeader
