import { Stack, Typography } from '@mui/material'
import React from 'react'

const DataLineIcon = ({ icon, text }) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ padding: '5px' }}>
      {icon}
      <Typography variant="body2">{text}</Typography>
    </Stack>
  )
}

export default DataLineIcon
