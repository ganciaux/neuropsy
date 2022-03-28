import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getData, updateData } from '../../api/api'
import ClientForm from '../../components/Clients/ClientForm'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientEdit = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const {
    isLoading,
    error: errorLoading,
    data,
  } = useQuery(['client', id], () => getData('/clients', id))

  const {
    isLoading: isMutating,
    isSuccess,
    reset,
    mutateAsync,
    error: errorMutating,
  } = useMutation(updateData)

  const onSubmit = async (data) => {
    await mutateAsync({ path: '/clients', ...data })
    queryClient.invalidateQueries(['client', id])
  }

  const title = data ? 'Gestion client - ' + data?._name : 'Gestion client'

  if (isLoading) {
    return <CommonLoader />
  }

  if (errorLoading) {
    return (
      <CommonLoaderAlert
        title={title}
        alertContent={errorLoading.message}
        href="/clients"
      />
    )
  }

  return (
    <CommonPageHeader title={title}>
      <ClientForm
        client={data}
        onSubmit={onSubmit}
        isLoading={isMutating}
        isSuccess={isSuccess}
        error={errorMutating}
        onClose={reset}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientEdit
