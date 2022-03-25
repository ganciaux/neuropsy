import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Alert } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import frLocale from 'date-fns/locale/fr'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { clientTypes } from '../Clients/consts/clientTypes'
import CommonAlert from '../common/CommonAlert/CommonAlert'

const ClientForm = ({
  client,
  onSubmit,
  onClose,
  isUpdating,
  isSuccess,
  error,
  href,
}) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: client,
  })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          {isSuccess && (
            <Alert
              sx={{ margintTop: '10px', marginBottom: '20px' }}
              onClose={onClose}
            >
              This is a success alert — check it out!
            </Alert>
          )}
          {error && (
            <CommonAlert
              title="An error has occurred:"
              content={error.message}
            />
          )}
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="name"
            placeholder="Nom"
            label="Nom"
            variant="outlined"
            fullWidth
            required
            {...register('name')}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="firstname"
            placeholder="Prénom"
            label="Prénom"
            {...register('firstname')}
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="birthdate"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  label="Date de naissance"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="type"
            label="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <InputLabel id="select-label">Type</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={value}
                  label="Age"
                  onChange={onChange}
                >
                  <MenuItem disabled value={-1}>
                    <em>Choisir un type</em>
                  </MenuItem>
                  {clientTypes.map((type) => (
                    <MenuItem key={type.id} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            {...register('email')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            type="number"
            placeholder="Enter phone number"
            label="Phone"
            {...register('phone')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="city"
            placeholder="Ville"
            label="Ville"
            {...register('city')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="zip"
            placeholder="Code postal"
            label="Code postal"
            {...register('zip')}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Adresse"
            {...register('address')}
            multiline
            rows={4}
            placeholder="Adresse"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            {...register('description')}
            multiline
            rows={4}
            placeholder="Description"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isUpdating}
            onClick={submitHandler}
          >
            Sauvegarder
          </Button>
          {href && (
            <Button
              sx={{ marginLeft: '10px' }}
              type="button"
              variant="outlined"
              color="primary"
              href={href}
            >
              Retour
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default ClientForm
