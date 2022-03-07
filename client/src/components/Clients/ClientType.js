import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { clientTypes } from './consts/clientTypes'
const ClientType = ({ id, name, value, onChange }) => {
  return (
    <CommonSelect
      id={id}
      label="Type"
      value={value}
      name={name}
      data={clientTypes}
      onChange={onChange}
    />
  )
}

export default ClientType
