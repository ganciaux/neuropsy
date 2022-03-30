import * as React from 'react'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import frLocale from 'date-fns/locale/fr'
import Box from '@mui/material/Box'

export default function CommonDateRange({ onChange, dates = [null, null] }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <DateRangePicker
        startText="Début"
        endText="Fin"
        value={dates}
        onChange={onChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> au </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  )
}
