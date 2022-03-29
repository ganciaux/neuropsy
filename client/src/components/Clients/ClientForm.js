import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Grid, TextField } from '@mui/material'
import { clientTypes } from '../Clients/consts/clientTypes'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDatePickerForm from '../common/CommonDatePickerForm/CommonDatePickerForm'
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
  client,
  onSubmit,
  onClose,
  isLoading,
  isSuccess,
  error,
  href,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: client,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const handleOnClose = () => {
    onClose()
    clearErrors()
  }
  const handleSave = () => {
    setIsOpen(true)
  }
  const handleCancel = () => {
    setIsOpen(false)
  }
  const handleOk = (data) => {
    console.log(data)
    setIsOpen(false)
    submitHandler(data)
  }

  const submitHandler = handleSubmit((data) => {
    onSubmit(data, reset)
  })

  return (
    <form>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          {isSuccess && (
            <CommonAlert
              title="Sauvegarde réussie..."
              severity="success"
              onClose={onClose}
            />
          )}
          {error && (
            <CommonAlert
              title="Une erreur s'est produite:"
              content={error.message}
              onClose={onClose}
            />
          )}
          {Object.keys(errors).length > 0 && (
            <CommonAlert
              title="Une erreur s'est produite:"
              errors={errors}
              onClose={handleOnClose}
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
            onClick={handleSave}
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
