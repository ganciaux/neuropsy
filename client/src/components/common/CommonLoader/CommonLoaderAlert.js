import { Button } from '@mui/material'
import React from 'react'
import CommonAlert from '../CommonAlert/CommonAlert'
import CommonPageHeader from '../CommonPageHeader/CommonPageHeader'

const CommonLoaderAlert = ({
  title,
  alertTitle = 'An error has occurred:',
  alertContent,
  severity = 'error',
  btnText = 'Retour',
  href,
  onClose,
}) => {
  return (
    <CommonPageHeader title={title ? title : ''}>
      <CommonAlert
        title={alertTitle}
        content={alertContent}
        severity={severity}
        onClose={onClose}
      />
      {href && (
        <Button type="button" variant="contained" color="primary" href={href}>
          {btnText}
        </Button>
      )}
    </CommonPageHeader>
  )
}

export default CommonLoaderAlert
