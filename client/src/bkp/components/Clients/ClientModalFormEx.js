import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Typography } from '@mui/material'
import CommonButton from '../common/CommonButton/CommonButton'

const defaultInputValues = {
  userId: '',
  email: '',
  phoneNumber: '',
}

const ClientModalForm = () => {
  const [values, setValues] = useState(defaultInputValues)

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      .required('User ID is required')
      .min(6, 'User ID must be at least 6 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid.'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const addClient = (data) => {
    console.log('addClient', data)
  }
  const handleChange = (value) => {
    setValues(value)
  }

  useEffect(() => {
    setValues(defaultInputValues)
  }, [])

  const getContent = () => (
    <Box>
      <TextField
        placeholder="User ID"
        name="userId"
        label="User ID"
        required
        {...register('userId')}
        error={errors.userId ? true : false}
        helperText={errors.userId?.message}
        value={values.userId}
        onChange={(event) =>
          handleChange({ ...values, userId: event.target.value })
        }
      />
      <TextField
        placeholder="Email"
        name="email"
        label="Email"
        required
        {...register('email')}
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        value={values.email}
        onChange={(event) =>
          handleChange({ ...values, email: event.target.value })
        }
      />
      <TextField
        placeholder="Phone number"
        name="phoneNumber"
        label="Phone number"
        required
        {...register('phoneNumber')}
        error={errors.phoneNumber ? true : false}
        helperText={errors.phoneNumber?.message}
        value={values.phoneNumber}
        onChange={(event) =>
          handleChange({ ...values, phoneNumber: event.target.value })
        }
      />
    </Box>
  )

  return (
    <Box>
      <Typography variant="h6" component="h2">
        {'New user'}
      </Typography>
      <Typography>{"Fill out inputs and hit 'submit' button."}</Typography>
      {getContent()}
      <Box>
        <CommonButton variant="contained" onClick={handleSubmit(addClient)}>
          Submit
        </CommonButton>
        <CommonButton>Cancel</CommonButton>
      </Box>
    </Box>
  )
}

export default ClientModalForm
