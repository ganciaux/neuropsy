import React from 'react'
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import frLocale from 'date-fns/locale/fr'
import { TextField } from '@mui/material'

const CommontDateTimePicker = ({
  name,
  label,
  value,
  required,
  handleOnChange,
  handleChangeDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <DateTimePicker
        name={name}
        label={label}
        value={value}
        fullWidth
        onChange={handleChangeDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            required={required}
            onChange={handleOnChange}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default CommontDateTimePicker
