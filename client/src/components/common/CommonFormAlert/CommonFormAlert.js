import React from 'react'
import CommonAlert from '../CommonAlert/CommonAlert'

const CommonFormAlert = ({
  queryIsSuccess,
  queryError,
  formStateErrors,
  queryReset,
  formClearErrors,
}) => {
  const handleOnClose = () => {
    queryReset()
    formClearErrors()
  }

  if (queryIsSuccess) {
    return (
      <CommonAlert
        title="Sauvegarde réussie..."
        severity="success"
        onClose={queryReset}
      />
    )
  }
  if (queryError) {
    return (
      <CommonAlert
        title="Une erreur s'est produite:"
        content={queryError.message}
        onClose={queryReset}
      />
    )
  }
  if (Object.keys(formStateErrors).length > 0) {
    return (
      <CommonAlert
        title="Une erreur s'est produite:"
        errors={formStateErrors}
        onClose={handleOnClose}
      />
    )
  }
  return <></>
}

export default CommonFormAlert
