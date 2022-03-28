import React from 'react'
import { useMutation } from 'react-query'
import { createData } from '../../api/api'
import { defaultData } from '../../components/Clients/consts/defaultData'
import ClientForm from '../../components/Clients/ClientForm'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientAdd = () => {
  const { isLoading, isSuccess, reset, mutateAsync, error } =
    useMutation(createData)

  const onSubmit = async (data, resetForm) => {
    await mutateAsync({ path: '/clients', ...data })
    resetForm(defaultData)
  }

  return (
    <CommonPageHeader title="Ajouter un nouveau client">
      <ClientForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
        onClose={reset}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientAdd
