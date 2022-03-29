import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Grid, TextField } from '@mui/material'
import { clientTypes } from '../Clients/consts/clientTypes'
import CommonDatePickerForm from '../common/CommonDatePickerForm/CommonDatePickerForm'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonSelectForm from '../common/CommonSelectForm/CommonSelectForm'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    name: yup.string().required('Le nom est obligatoire'),
    firstname: yup.string().required('Le prénom est obligatoire'),
  })
  .required()

const ClientForm = ({
  data,
  onSubmit,
  isLoading,
  isSuccess,
  queryError,
  queryReset,
  href,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset: formRest,
    clearErrors: formClearErrors,
    formState: { errors: formStateErrors },
  } = useForm({
    defaultValues: data,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data, formRest)
  })

  return (
    <form>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <CommonFormAlert
            queryIsSuccess={isSuccess}
            queryError={queryError}
            formStateErrors={formStateErrors}
            queryReset={queryReset}
            formClearErrors={formClearErrors}
          />
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
          <CommonDatePickerForm
            control={control}
            name="birthdate"
            label="Date de naissance"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommonSelectForm
            control={control}
            name="type"
            label="Type"
            id="select"
            data={clientTypes}
            defaultValue
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
            type="button"
            variant="contained"
            color="primary"
            disabled={isLoading || isSuccess}
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
