import React from 'react'
import { defaultData } from '../../components/Clients/consts/defaultData'
import ClientForm from '../../components/Clients/ClientForm'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryAdd } from '../../utils/useFormQueryAdd'

const ClientAdd = () => {
  const { isLoading, isSuccess, error, onSubmit, reset } = useFormQueryAdd(
    'clients',
    defaultData,
  )

  return (
    <CommonPageHeader title="Ajouter un nouveau client">
      <ClientForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        queryError={error}
        queryReset={reset}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientAdd
