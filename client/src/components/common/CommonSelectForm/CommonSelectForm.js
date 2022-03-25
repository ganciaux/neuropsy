import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const CommonSelectForm = ({ control, name, label, id, data, defaultValue }) => {
  return (
    <Controller
      name={name}
      label={label}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={id}
            value={value ? value : -1}
            label={label}
            onChange={onChange}
          >
            {defaultValue && (
              <MenuItem disabled value={-1}>
                <em>Choisir</em>
              </MenuItem>
            )}

            {data?.map((d) => (
              <MenuItem key={d.id} value={d.value}>
                {d.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default CommonSelectForm
