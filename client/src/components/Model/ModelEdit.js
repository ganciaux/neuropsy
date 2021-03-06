import React from 'react'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useQueryAndMutation } from '../../utils/useQueryAndMutation'

const ModelEdit = ({ title, model, href, render }) => {
  const formQuery = useQueryAndMutation(model)

  const pageTitle = formQuery.query.data?._name
    ? `${title} - ` + formQuery.query.data?._name
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
