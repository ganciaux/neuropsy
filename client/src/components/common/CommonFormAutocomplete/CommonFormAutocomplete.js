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
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
}) => {
  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={renderInput}
          onChange={(e, data) => onChange(data)}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  )
}

export default CommonFormAutocomplete
