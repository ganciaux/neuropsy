import React from 'react'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryAdd } from '../../utils/useFormQueryAdd'

const ModelAdd = ({ title, model, defaultData, render }) => {
  const formQuery = useFormQueryAdd(model, defaultData)

  return <CommonPageHeader title={title}>{render(formQuery)}</CommonPageHeader>
}

export default ModelAdd
