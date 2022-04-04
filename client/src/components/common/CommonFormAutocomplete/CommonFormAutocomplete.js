import React from 'react'
import { Controller } from 'react-hook-form'
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

const CommonFormAutocomplete = ({
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
          <Autocomplete
            id={id}
            options={data.map((option) => option.label)}
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        </FormControl>
      )}
    />
  )
}

export default CommonFormAutocomplete
