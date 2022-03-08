import { Typography } from '@mui/material'
import React from 'react'

const DataLineHeader = ({ title }) => {
  return (
    <Typography variant="subtitle1" gutterBottom>
      {title}
    </Typography>
  )
}

export default DataLineHeader
