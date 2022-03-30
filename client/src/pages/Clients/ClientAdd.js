import React from 'react'
import { defaultData } from '../../components/Clients/consts/defaultData'
import ClientForm from '../../components/Clients/ClientForm'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryAdd } from '../../utils/useFormQueryAdd'

const ClientAdd = () => {
  const { query, mutation, onSubmit } = useFormQueryAdd('clients', defaultData)

  return (
    <CommonPageHeader title="Ajouter un nouveau client">
      <ClientForm
        query={query}
        mutation={mutation}
        onSubmit={onSubmit}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientAdd
