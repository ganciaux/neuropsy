import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const CommonSelect = ({ id, label, value, name, data = [], onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`IL${id}`}>{label}</InputLabel>
      <Select
        name={name}
        labelId={`IL${id}`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {data.map((element) => (
          <MenuItem key={element.id} value={element.value}>
            {element.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CommonSelect
