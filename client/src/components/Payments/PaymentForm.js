import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'

const PaymentForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    clientId: '',
    price: 0.0,
    type: 0,
    status: 0,
    description: '',
    date: new Date(),
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/clients`)
      .then((res) => {
        setClients(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  useEffect(() => {
    if (isNew === false) {
      axios
        .get(`http://localhost:5001/api/payments/${id}`)
        .then((res) => {
          console.log(res)
          setData(res.data.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({ isSuccess: false, isError: false, message: '' })
    if (isNew) {
      axios
        .post('http://localhost:5001/api/Payments', data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`http://localhost:5001/api/Payments/${data._id}`, data)
        .then((res) => {
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    }
  }

  const [clients, setClients] = React.useState([])
  const [data, setData] = React.useState(defaultData)
  const [error, setError] = React.useState({ isError: false, message: '' })

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }
  const handleChangeDate = (newValue) => {
    setData({ ...data, birthdate: newValue })
  }

  return (
    <CommonGridForm>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            name="date"
            label="Date du paiment"
            inputFormat="dd/MM/yyyy"
            value={data.birthdate}
            fullWidth
            onChange={handleChangeDate}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                required
                onChange={handleOnChange}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          label="Description"
          value={data.description}
          multiline
          rows={4}
          placeholder="Description"
          variant="outlined"
          fullWidth
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <CommonSelect
          id="client"
          label="client"
          value=""
          name="clientId"
          data={clients}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {isNew && 'Ajouter'}
          {!isNew && 'Modifier'}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {error.isError && <Alert severity="error">{error.message}</Alert>}
        {error.isSuccess && <Alert severity="success">{error.message}</Alert>}
      </Grid>
    </CommonGridForm>
  )
}

export default PaymentForm
