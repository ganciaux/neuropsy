import React from 'react'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryList } from '../../utils/useFormQueryList'

const ModelList = ({ title, model, render }) => {
  const query = useFormQueryList(model)

  if (query.isLoading) {
    return <CommonLoader />
  }

  if (query.error) {
    return (
      <CommonLoaderAlert title={title} alertContent={query.error.message} />
    )
  }

  return <CommonPageHeader title={title}>{render(query)}</CommonPageHeader>
}

export default ModelList
