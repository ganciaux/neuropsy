import React from 'react'
import { useParams } from 'react-router-dom'
import { getData, updateData } from '../../api/api'
import { useQuery, useQueryClient } from 'react-query'
import ClientForm2 from '../../components/Clients/ClientForm2'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientEdit = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { isLoading, error, data, isFetching } = useQuery('client', () =>
    getData('/clients', id),
  )

  const onSubmit = async (data) => {
    console.log('onSubmit')
    const editedClient = await updateData('/clients', data)
    queryClient.invalidateQueries('clients')
  }

  if (isLoading) return <CommonLoader />

  if (error) {
    return (
      <CommonAlert title="An error has occurred:" content={error.message} />
    )
  }

  return (
    <CommonPageHeader title="Gestion client">
      <ClientForm2 client={data} onSubmit={onSubmit} back />
    </CommonPageHeader>
  )
}

export default ClientEdit
