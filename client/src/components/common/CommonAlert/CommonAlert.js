import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const CommonAlert = ({
  title,
  content,
  onClose,
  errors = {},
  severity = 'error',
}) => {
  const alertErrors = Object.entries(errors)
  return (
    <Alert severity={severity} sx={{ marginBottom: '10px' }} onClose={onClose}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {content}
      {alertErrors.map((error) => (
        <p key={error}>{error[1].message}</p>
      ))}
    </Alert>
  )
}

export default CommonAlert
