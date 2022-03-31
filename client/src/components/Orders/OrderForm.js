import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { orderStatus } from './consts/orderStatus'
import OrderLines from './OrderLines'
import CommonFormButton from '../common/CommonFormButton/CommonFormButton'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonFormSelectQuery from '../common/CommonFormSelectQuery/CommonFormSelectQuery'
import CommonFormDatePicker from '../common/CommonFormDatePicker/CommonFormDatePicker'
import CommonFormSelect from '../common/CommonFormSelect/CommonFormSelect'

const schema = yup
  .object({
    date: yup.date().required('La date est obligatoire'),
  })
  .required()

const OrderForm = ({ query, mutation, onSubmit, href }) => {
  const [data, setData] = useState(query.data)
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
    console.log('form order data:', data)
    onSubmit(data, formRest)
  })

  const formatData = (data) => {
    return {
      ...data,
      articles: data.articles.map((article) => {
        if (article.articleId === '-1') {
          delete article.articleId
        }
        return article
      }),
    }
  }

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
        <Grid item xs={6} sm={6} md={4}>
          <CommonFormDatePicker
            control={control}
            name="date"
            label="Date de la commande"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={8}>
          <CommonFormSelect
            control={control}
            name="status"
            label="Statut"
            id="selectStatus"
            data={orderStatus}
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
          <OrderLines control={control} data={data} setData={setData} />
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

export default OrderForm
