import React from 'react'
import CommonAlert from '../CommonAlert/CommonAlert'

const CommonFormAlert = ({
  mutation,
  formStateErrors,
  formClearErrors,
  successTitle,
}) => {
  const handleOnClose = () => {
    mutation.reset()
    formClearErrors()
  }

  if (mutation.isSuccess) {
    const title = successTitle ? successTitle : 'Sauvegarde réussie...'
    return (
      <CommonAlert title={title} severity="success" onClose={mutation.reset} />
    )
  }
  if (mutation.error) {
    return (
      <CommonAlert
        title="Une erreur s'est produite:"
        content={mutation.error.message}
        onClose={mutation.reset}
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
