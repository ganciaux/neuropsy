import React from 'react'
import { Skeleton } from '@mui/material'
import { useQueryList } from '../../../utils/useQueryList'
import CommonLoaderAlert from '../CommonLoader/CommonLoaderAlert'
import CommonFormSelect from '../CommonFormSelect/CommonFormSelect'

const CommonFormSelectQuery = ({
  control,
  name,
  label,
  id,
  defaultValue,
  keyId = 'id',
  keyValue = 'value',
  keyLabel = 'label',
  model,
}) => {
  const queryClients = useQueryList(model)

  if (queryClients.isLoading) {
    return <Skeleton sx={{ height: '60px' }} />
  }

  if (queryClients.error) {
    return <CommonLoaderAlert alertContent={queryClients.error.message} />
  }

  return (
    <CommonFormSelect
      control={control}
      name={name}
      label={label}
      id={id}
      keyId={keyId}
      keyValue={keyValue}
      keyLabel={keyLabel}
      data={queryClients.data}
      defaultValue={defaultValue}
    />
  )
}

export default CommonFormSelectQuery
