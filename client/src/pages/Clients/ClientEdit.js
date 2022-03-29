import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryUpdate } from '../../utils/useFormQueryUpdate'

const ClientEdit = () => {
  const {
    data,
    isLoading,
    isMutating,
    isSuccess,
    errorMutating,
    errorLoading,
    onSubmit,
    reset,
  } = useFormQueryUpdate('clients')

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
        data={data}
        onSubmit={onSubmit}
        isLoading={isMutating}
        isSuccess={isSuccess}
        queryError={errorMutating}
        queryReset={reset}
        href="/clients"
      />
    </CommonPageHeader>
  )
}

export default ClientEdit
