import React from 'react'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { useFormQueryAdd } from '../../utils/useFormQueryAdd'

const ModelAdd = ({ title, model, defaultData, modelForm }) => {
  const formQuery = useFormQueryAdd(model, defaultData)

  return (
    <CommonPageHeader title={title}>{modelForm(formQuery)}</CommonPageHeader>
  )
}

export default ModelAdd
