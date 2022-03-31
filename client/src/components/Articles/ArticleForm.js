import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, InputAdornment, TextField } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import TodayIcon from '@mui/icons-material/Today'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../common/CommonFormButton/CommonFormButton'

const schema = yup
  .object({
    name: yup.string().required('Le nom est obligatoire'),
    label: yup.string().required('Le label est obligatoire'),
    price: yup.number().required('Le prix est obligatoire'),
  })
  .required()

const ArticleForm = ({ query, mutation, onSubmit, href }) => {
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
        <Grid xs={12} sm={12} item>
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
        <Grid item xs={12}>
          <TextField
            name="label"
            placeholder="Label"
            label="Label"
            variant="outlined"
            fullWidth
            required
            {...register('label')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="price"
            type="number"
            placeholder="Prix"
            label="Prix"
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
        <Grid item xs={6}>
          <TextField
            name="sessions"
            type="number"
            placeholder="Rendez-vous"
            label="Rendez-vous"
            variant="outlined"
            fullWidth
            required
            sx={{ input: { textAlign: 'right' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TodayIcon />
                </InputAdornment>
              ),
            }}
            {...register('sessions')}
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

export default ArticleForm
