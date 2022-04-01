import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonFormAlert from '../common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../common/CommonFormButton/CommonFormButton'

const schema = yup
  .object({
    username: yup.string().required("Le nom d'utilisateur est obligatoire"),
    password: yup.string().required('Le mot de passe est obligatoire'),
  })
  .required()

const UserForm = ({ query, mutation, onSubmit, href }) => {
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
            name="username"
            placeholder="Nom d'utilisateur"
            label="Nom d'utilisateur"
            variant="outlined"
            fullWidth
            required
            {...register('username')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            placeholder="Mot de passe"
            label="Mot de passe"
            variant="outlined"
            fullWidth
            required
            {...register('password')}
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

export default UserForm
