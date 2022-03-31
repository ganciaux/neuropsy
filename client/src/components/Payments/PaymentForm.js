import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, InputAdornment, TextField } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { paymentStatus } from './consts/paymentStatus'
import { paymentTypes } from './consts/paymentTypes'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../common/CommonFormButton/CommonFormButton'
import CommonSelectForm from '../common/CommonSelectForm/CommonSelectForm'
import CommonDatePickerForm from '../common/CommonDatePickerForm/CommonDatePickerForm'

const schema = yup
  .object({
    type: yup.number().required('Le type est obligatoire'),
    status: yup.number().required('Le status est obligatoire'),
    price: yup.number().required('Le prix est obligatoire'),
  })
  .required()

const PaymentForm = ({ query, mutation, onSubmit, href }) => {
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
          <CommonSelectForm
            control={control}
            name="clientId"
            label="Client"
            id="selectClient"
            data={paymentTypes}
            defaultValue
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonDatePickerForm
            control={control}
            name="date"
            label="Date du paiement"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <TextField
            name="price"
            placeholder="Montant"
            label="Montant"
            variant="outlined"
            fullWidth
            required
            sx={{ input: { textAlign: 'right' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EuroIcon />
                </InputAdornment>
              ),
            }}
            {...register('price')}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonSelectForm
            control={control}
            name="type"
            label="Type"
            id="selectType"
            data={paymentTypes}
            defaultValue
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonSelectForm
            control={control}
            name="status"
            label="Statut"
            id="selectStatus"
            data={paymentStatus}
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

export default PaymentForm
