import React from 'react'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import frLocale from 'date-fns/locale/fr'
import { TextField } from '@mui/material'

const CommontDatePicker = ({
  name,
  label,
  value,
  required = false,
  handleOnChange,
  handleChangeDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <DesktopDatePicker
        name={name}
        label={label}
        inputFormat="dd/MM/yyyy"
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

export default CommontDatePicker
