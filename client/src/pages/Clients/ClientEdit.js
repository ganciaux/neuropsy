import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getData, updateData } from '../../api/api'
import ClientForm from '../../components/Clients/ClientForm'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientEdit = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery('client', () =>
    getData('/clients', id),
  )

  const {
    isLoading: isUpdating,
    isSuccess,
    reset,
    mutate,
  } = useMutation(
    async (e) => {
      const editedClient = await updateData('/clients', e)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients')
      },
    },
  )

  if (isLoading) return <CommonLoader />

  if (error) {
    return (
      <CommonAlert title="An error has occurred:" content={error.message} />
    )
  }

  return (
    <CommonPageHeader title="Gestion client">
      <ClientForm
        client={data}
        onSubmit={mutate}
        isUpdating={isUpdating}
        isSuccess={isSuccess}
        onClose={reset}
        href="/clients/list"
      />
    </CommonPageHeader>
  )
}

export default ClientEdit
