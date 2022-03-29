import React from 'react'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryUpdate } from '../../utils/useFormQueryUpdate'

const ModelEdit = ({ title, model, href, modelForm }) => {
  const formQuery = useFormQueryUpdate(model)

  const header = formQuery.data ? `${title} - ` + formQuery.data?._name : title

  if (formQuery.queryIsLoading) {
    return <CommonLoader />
  }

  if (formQuery.errorLoading) {
    return (
      <CommonLoaderAlert
        title={header}
        alertContent={formQuery.errorLoading.message}
        href={href}
      />
    )
  }

  return (
    <CommonPageHeader title={header}>{modelForm(formQuery)}</CommonPageHeader>
  )
}

export default ModelEdit
