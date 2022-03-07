import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { clientTypes } from './consts/clientTypes'
const ClientType = ({ id, name, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="clientTypeLabel">Type</InputLabel>
      <Select
        name={name}
        labelId="clientTypeLabel"
        id={id}
        value={value}
        label="Type"
        onChange={onChange}
      >
        {clientTypes.map((type) => (
          <MenuItem key={type.id} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ClientType
