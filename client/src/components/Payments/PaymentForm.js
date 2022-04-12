import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { paymentStatus } from './consts/paymentStatus'
import { paymentTypes } from './consts/paymentTypes'
import { getTypeLabel } from './utils/paymentUtils'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../common/CommonFormButton/CommonFormButton'
import CommonFormSelect from '../common/CommonFormSelect/CommonFormSelect'
import CommonFormDatePicker from '../common/CommonFormDatePicker/CommonFormDatePicker'
import CommonFormSelectQuery from '../common/CommonFormSelectQuery/CommonFormSelectQuery'

const schema = yup
  .object({
    //type: yup.number().required('Le type est obligatoire'),
    status: yup.number().required('Le status est obligatoire'),
    price: yup.number().required('Le prix est obligatoire'),
  })
  .required()

const PaymentForm = ({ query, mutation, onSubmit, href }) => {
  console.log('PaymentForm:', query.data.isFromClient, query.data.clientId)
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
    console.log('submit:', data)
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
            disabled={Boolean(query.data.isFromClient)}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonFormDatePicker
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
          {/*
          <CommonFormSelect
            control={control}
            name="type"
            label="Type"
            id="selectType"
            data={paymentTypes}
            defaultValue
          />
          */}
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  console.log('onchange:', item)
                  onChange(item?.id)
                }}
                value={value}
                options={paymentTypes}
                getOptionLabel={(item) => {
                  //console.log('getOptionLabel:', item)
                  if (item > 0) return getTypeLabel(item)
                  else return item.label ? item.label : ''
                  //return item.label ? item.label : getTypeLabel(item)
                }}
                isOptionEqualToValue={(option, value) => {
                  if (value === -1 && option.id === 1) return true
                  return option?.id === value
                }}
                getOptionDisabled={(option) => option.id === -1}
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <CommonFormSelect
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
            href={query.data.back ? query.data.back : href}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default PaymentForm
