import React from 'react'
import { Button } from '@mui/material'
const CommonBack = ({ path, label, back }) => {
  return (
    <>
      {back && (
        <Button
          sx={{ marginLeft: '5px' }}
          type="button"
          variant="outlined"
          color="primary"
          href={path}
        >
          {label}
        </Button>
      )}
    </>
  )
}

export default CommonBack
