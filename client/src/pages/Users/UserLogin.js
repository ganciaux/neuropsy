import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Grid, TextField, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonFormAlert from '../../components/common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../../components/common/CommonFormButton/CommonFormButton'
import { delay, login } from '../../api/api'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { userContext } from '../../AppContext'

const schema = yup
  .object({
    email: yup.string().required("L'email est obligatoire"),
    password: yup.string().required('Le mot de passe est obligatoire'),
  })
  .required()

const UserLogin = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const mutation = useMutation(login)

  const onSubmit = async (data) => {
    const userData = await mutation.mutateAsync({
      path: '/users/login',
      ...data,
    })
    console.log(userData)
    await delay()
    //navigate('/clients')
    window.location.replace('/clients')
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
    <CommonPageHeader title="">
      {!user ? (
        <form>
          <Grid container spacing={1} justifyContent="center">
            <Grid xs={8} sm={8} item>
              <CommonFormAlert
                mutation={mutation}
                formStateErrors={formStateErrors}
                formClearErrors={formClearErrors}
                successTitle="Login réussi..."
              />
            </Grid>
            <Grid xs={8} sm={8} item>
              <Typography variant="h5" sx={{}}>
                Login
              </Typography>
            </Grid>
            <Grid xs={8} sm={8} item>
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
            <Grid xs={8} sm={8} item>
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
            <Grid xs={8} sm={8} item>
              <CommonFormButton
                isLoading={mutation.isLoading}
                isSuccess={mutation.isSuccess}
                submitHandler={submitHandler}
                submitTitle="Login"
              />
            </Grid>
          </Grid>
        </form>
      ) : (
        <div>You are already logged !</div>
      )}
    </CommonPageHeader>
  )
}

export default UserLogin
