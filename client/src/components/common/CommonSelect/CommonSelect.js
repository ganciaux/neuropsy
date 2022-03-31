import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const CommonSelect = ({
  name,
  label,
  id,
  data,
  defaultValue,
  keyId = 'id',
  keyValue = 'value',
  keyLabel = 'label',
  onChange,
  value,
  all,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value ? value : -1}
        label={label}
        onChange={onChange}
        name={name}
      >
        {defaultValue && (
          <MenuItem disabled={!Boolean(all)} value={-1}>
            <em>Choisir</em>
          </MenuItem>
        )}
        {data?.map((d) => (
          <MenuItem key={d[keyId]} value={d[keyValue]}>
            {d[keyLabel]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CommonSelect
