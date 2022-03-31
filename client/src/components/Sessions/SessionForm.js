import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { sessionStatus } from './consts/sessionStatus'
import { sessionTypes } from './consts/sessionTypes'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../common/CommonFormButton/CommonFormButton'
import CommonFormSelect from '../common/CommonFormSelect/CommonFormSelect'
import CommonFormDatePicker from '../common/CommonFormDatePicker/CommonFormDatePicker'
import CommonFormSelectQuery from '../common/CommonFormSelectQuery/CommonFormSelectQuery'

const schema = yup
  .object({
    date: yup.date().required('La date est obligatoire'),
  })
  .required()

const SessionForm = ({ query, mutation, onSubmit, href }) => {
  const {
    control,
    register,
    handleSubmit,
    reset: formRest,
    clearErrors: formClearErrors,
    formState: { errors: formStateErrors },
  } = useForm({
    defaultValues: query.data,
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
            mutation={mutation}
            formStateErrors={formStateErrors}
            formClearErrors={formClearErrors}
          />
        </Grid>
        <Grid item xs={12}>
          <CommonFormSelectQuery
            control={control}
            name="clientId"
            label="Client"
            id="selectClient"
            keyId="id"
            keyValue="id"
            keyLabel="_name"
            defaultValue
            model="clients"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonFormDatePicker
            control={control}
            name="date"
            label="Date du rendez-vous"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonFormSelect
            control={control}
            name="status"
            label="Statut"
            id="selectStatus"
            data={sessionStatus}
            defaultValue
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CommonFormSelect
            control={control}
            name="type"
            label="Type"
            id="selectType"
            data={sessionTypes}
            defaultValue
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            placeholder="Description"
            variant="outlined"
            fullWidth
            {...register('description')}
          />
        </Grid>
        <Grid item xs={12}>
          <CommonFormButton
            isLoading={mutation.isLoading}
            isSuccess={mutation.isSuccess}
            submitHandler={submitHandler}
            href={href}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default SessionForm
