import { Button } from '@mui/material'
import React from 'react'

const CommonFormButton = ({
  isLoading,
  isSuccess,
  submitHandler,
  href,
  submitTitle = 'Sauvegarder',
  hrefTitle = 'Retour',
}) => {
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
          href={href}
        >
          {hrefTitle}
        </Button>
      )}
    </>
  )
}

export default CommonFormButton
