import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { createData } from '../../api/api'
import ClientForm from '../../components/Clients/ClientForm'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientAdd = () => {
  const queryClient = useQueryClient()

  const {
    isLoading: isUpdating,
    isSuccess,
    reset,
    mutate,
    error,
  } = useMutation(
    async (e) => {
      const addedClient = await createData('/clients', e)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients')
      },
    },
  )

  console.log(error)

  return (
    <CommonPageHeader title="Ajout client">
      <ClientForm
        onSubmit={mutate}
        isUpdating={isUpdating}
        isSuccess={isSuccess}
        error={error}
        onClose={reset}
        href="/clients/list"
      />
    </CommonPageHeader>
  )
}

export default ClientAdd
