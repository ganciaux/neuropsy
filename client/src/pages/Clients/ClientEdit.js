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

  console.log('ClientEdit:', data)

  const {
    isLoading: isUpdating,
    isSuccess,
    reset,
    mutate,
    error: errorAction,
  } = useMutation(
    async (formData) => {
      const mutatedData = await updateData('/clients', formData)
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('ClientEdit: onSuccess: data:', data)
        console.log('ClientEdit: onSuccess: variables:', variables)
        console.log('ClientEdit: onSuccess: context:', context)
        queryClient.invalidateQueries(['client', id])
      },
      onError: (error, variables, context) => {
        console.log('ClientEdit: onError: error:', error)
        console.log('ClientEdit: onError: variables:', variables)
        console.log('ClientEdit: onError: context:', context)
      },
    },
  )

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
        onSubmit={mutate}
        isUpdating={isUpdating}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={errorAction}
        onClose={reset}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientEdit
