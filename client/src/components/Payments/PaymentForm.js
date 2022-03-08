import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import frLocale from 'date-fns/locale/fr'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { paymentStatus } from './consts/paymentStatus'
import { paymentTypes } from './consts/paymentTypes'
import { format, parseISO } from 'date-fns'

const PaymentForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    clientId: '-1',
    price: 0.0,
    type: 0,
    status: 0,
    description: '',
    date: new Date(),
  }
  const [clients, setClients] = React.useState([])
  const [data, setData] = React.useState(defaultData)
  const [error, setError] = React.useState({ isError: false, message: '' })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/clients`)
      .then((res) => {
        res.data.data.push({ _id: '-1', value: '-1', _name: 'Aucun' })
        setClients(
          res.data.data.map((data) => {
            return { id: data._id, value: data._id, label: data._name }
          }),
        )
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  useEffect(() => {
    if (isNew === false) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/payments/${id}`)
        .then((res) => {
          setData(res.data.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }, [id, isNew])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({ isSuccess: false, isError: false, message: '' })
    if (isNew) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/payments`, data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/payments/${data._id}`, data)
        .then((res) => {
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    }
  }

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeDate = (newValue) => {
    setData({ ...data, date: newValue })
  }

  return (
    <CommonGridForm>
      <Grid item xs={12}>
        <CommonSelect
          id="client"
          label="Client"
          value={data.clientId}
          name="clientId"
          data={clients}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
          <DesktopDatePicker
            name="date"
            label="Date du paiement"
            inputFormat="dd/MM/yyyy"
            value={data.date}
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
      <Grid item xs={6} sm={6} md={3}>
        <TextField
          name="price"
          label="Montant"
          value={data.price}
          placeholder="Montant"
          variant="outlined"
          fullWidth
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <CommonSelect
          id="type"
          label="Type"
          value={data.type}
          name="type"
          data={paymentTypes}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <CommonSelect
          id="status"
          label="Statut"
          value={data.status}
          name="status"
          data={paymentStatus}
          onChange={handleOnChange}
        />
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
