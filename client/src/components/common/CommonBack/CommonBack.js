import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const CommonBack = ({ id, path, label }) => {
  const navigate = useNavigate()
  return (
    <>
      {id && (
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
      {!id && (
        <Button
          sx={{ marginLeft: '5px' }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          {label}
        </Button>
      )}
    </>
  )
}

export default CommonBack
