import React from 'react'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryUpdate } from '../../utils/useFormQueryUpdate'

const ModelEdit = ({ title, model, href, render }) => {
  const formQuery = useFormQueryUpdate(model)

  const pageTitle = formQuery.data
    ? `${title} - ` + formQuery.data?._name
    : title

  if (formQuery.query.isLoading) {
    return <CommonLoader />
  }

  if (formQuery.query.error) {
    return (
      <CommonLoaderAlert
        title={pageTitle}
        alertContent={formQuery.query.error.message}
        href={href}
      />
    )
  }

  return (
    <CommonPageHeader title={pageTitle}>{render(formQuery)}</CommonPageHeader>
  )
}

export default ModelEdit
