import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CommonFormButton = ({
  isLoading,
  isSuccess,
  submitHandler,
  href,
  submitTitle = 'Sauvegarder',
  hrefTitle = 'Retour',
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="primary"
        disabled={isLoading || isSuccess}
        onClick={submitHandler}
      >
        {submitTitle}
      </Button>
      {href && (
        <Button
          sx={{ marginLeft: '10px' }}
          type="button"
          variant="outlined"
          color="primary"
          onClick={() => navigate(href)}
        >
          {/*href={href}*/}
          {hrefTitle}
        </Button>
      )}
    </>
  )
}

export default CommonFormButton
