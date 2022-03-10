import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const CommonAlert = ({ title, content, severity = 'error' }) => {
  return (
    <Alert severity={severity}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {content}
    </Alert>
  )
}

export default CommonAlert
