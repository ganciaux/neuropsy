import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const CommonFormSelect = ({
  control,
  name,
  label,
  id,
  data,
  defaultValue,
  keyId = 'id',
  keyValue = 'value',
  keyLabel = 'label',
  commonOnChange,
}) => {
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
            onChange={(e) => {
              onChange(e)
              if (commonOnChange) {
                commonOnChange(e)
              }
            }}
          >
            {defaultValue && (
              <MenuItem disabled value={-1}>
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
      )}
    />
  )
}

export default CommonFormSelect
