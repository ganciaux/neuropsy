import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import frLocale from 'date-fns/locale/fr'

const CommonFormDatePicker = ({ control, name, label, fullWidth = true }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            label={label}
            value={value}
            clearable
            clearText="Vider"
            onChange={onChange}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default CommonFormDatePicker
