import React from 'react'
import { useMutation } from 'react-query'
import { createData } from '../../api/api'
import ClientForm from '../../components/Clients/ClientForm'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientAdd = () => {
  const {
    isLoading: isUpdating,
    isSuccess,
    reset,
    mutate,
    error,
  } = useMutation(
    async (formData) => {
      console.log('ClientAdd: useMutation:', formData)
      const mutatedData = await createData('/clients', formData)
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('ClientAdd: onSuccess: data:', data)
        console.log('ClientAdd: onSuccess: variables:', variables)
        console.log('ClientAdd: onSuccess: context:', context)
      },
      onError: (error, variables, context) => {
        console.log('ClientAdd: onError: error:', error)
        console.log('ClientAdd: onError: variables:', variables)
        console.log('ClientAdd: onError: context:', context)
      },
    },
  )

  return (
    <CommonPageHeader title="Ajouter un nouveau client">
      <ClientForm
        onSubmit={mutate}
        isUpdating={isUpdating}
        isSuccess={isSuccess}
        error={error}
        onClose={reset}
        href="/clients"
        create
      />
    </CommonPageHeader>
  )
}

export default ClientAdd
