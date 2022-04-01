import React from 'react'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useQueryMutation } from '../../utils/useQueryMutation'

const ModelAdd = ({ title, model, defaultData, render }) => {
  const formQuery = useQueryMutation(model, defaultData)

  return <CommonPageHeader title={title}>{render(formQuery)}</CommonPageHeader>
}

export default ModelAdd
