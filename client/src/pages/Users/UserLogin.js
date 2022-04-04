import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { Button, Grid, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CommonFormAlert from '../../components/common/CommonFormAlert/CommonFormAlert'
import CommonFormButton from '../../components/common/CommonFormButton/CommonFormButton'
import { delay, login, logout } from '../../api/api'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { userContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'

const schema = yup
  .object({
    email: yup.string().required("L'email est obligatoire"),
    password: yup.string().required('Le mot de passe est obligatoire'),
  })
  .required()

const UserLogin = () => {
  const { user, setUser } = useContext(userContext)
  const navigate = useNavigate()

  const mutation = useMutation(login)
  const { status, data, error, refetch } = useQuery('logout', logout, {
    enabled: false,
  })

  const onSubmit = async (data) => {
    const userData = await mutation.mutateAsync({
      path: '/users/login',
      ...data,
    })
    console.log(userData)
    setUser(userData)
    await delay()
    window.location.reload()
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

  const submitHandlerLogout = async () => {
    refetch()
    await delay()
    setUser(null)
    window.location.reload()
  }

  return (
    <CommonPageHeader title="Login">
      {!user ? (
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
      ) : (
        <Button onClick={submitHandlerLogout}>Logout</Button>
      )}
    </CommonPageHeader>
  )
}

export default UserLogin
