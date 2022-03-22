import { Button } from '@mui/material'
import React from 'react'
const CommonBack = ({ path, label }) => {
  return (
    <>
      <Button
        sx={{ marginLeft: '5px' }}
        type="button"
        variant="outlined"
        color="primary"
        href={path}
      >
        {label}
      </Button>
    </>
  )
}

export default CommonBack
