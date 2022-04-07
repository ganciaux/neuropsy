import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
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

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

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
              <OutlinedInput
                id="outlined-adornment-email"
                value={values.email}
                fullWidth
                {...register('email')}
                onChange={handleChange('email')}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <AccountCircleIcon />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Email"
              />
            </Grid>
            <Grid xs={8} sm={8} item>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                fullWidth
                {...register('password')}
                onChange={handleChange('password')}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <LockIcon />
                    </IconButton>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Mot de passe"
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
