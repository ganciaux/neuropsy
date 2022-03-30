import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const CommonSelect = ({
  id,
  label,
  value,
  name,
  data = [],
  onChange,
  placeHolder = 'Aucun',
  placeHolderValue = '-1',
}) => {
  return (
    <FormControl fullWidth>
      {data.length > 0 && (
        <>
          <InputLabel id={`IL${id}`}>{label}</InputLabel>
          <Select
            name={name}
            labelId={`IL${id}`}
            id={id}
            value={value}
            label={label}
            onChange={onChange}
          >
            <MenuItem disabled value={placeHolderValue}>
              <em>{placeHolder}</em>
            </MenuItem>
            {data.map((element) => (
              <MenuItem key={element.id} value={element.value}>
                {element.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </FormControl>
  )
}

export default CommonSelect
