import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryUpdate } from '../../utils/useFormQueryUpdate'

const ClientEdit = () => {
  const { query, mutation, onSubmit } = useFormQueryUpdate('clients')

  const title = query.data
    ? 'Gestion client - ' + query.data?._name
    : 'Gestion client'

  if (query.isLoading) {
    return <CommonLoader />
  }

  if (query.error) {
    return (
      <CommonLoaderAlert
        title={title}
        alertContent={query.error.message}
        href="/clients"
      />
    )
  }

  return (
    <CommonPageHeader title={title}>
      <ClientForm
        query={query}
        mutation={mutation}
        onSubmit={onSubmit}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientEdit
