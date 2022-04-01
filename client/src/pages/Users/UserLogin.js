import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Grid, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonFormAlert from '../../components/common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../../components/common/CommonFormButton/CommonFormButton'
import { login } from '../../api/api'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const schema = yup
  .object({
    email: yup.string().required("L'email est obligatoire"),
    password: yup.string().required('Le mot de passe est obligatoire'),
  })
  .required()

const UserLogin = () => {
  const mutation = useMutation(login)

  const onSubmit = async (data) => {
    await mutation.mutateAsync({ path: '/users/login', ...data })
  }

  const {
    register,
    handleSubmit,
    clearErrors: formClearErrors,
    formState: { errors: formStateErrors },
  } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <CommonPageHeader title="Login">
      <form>
        <Grid container spacing={1}>
          <Grid xs={12} item>
            <CommonFormAlert
              mutation={mutation}
              formStateErrors={formStateErrors}
              formClearErrors={formClearErrors}
              successTitle="Login réussi..."
            />
          </Grid>
          <Grid xs={12} sm={12} item>
            <TextField
              name="email"
              placeholder="Email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              {...register('email')}
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
              submitTitle="Login"
            />
          </Grid>
        </Grid>
      </form>
    </CommonPageHeader>
  )
}

export default UserLogin
