import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, InputAdornment, TextField } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { paymentStatus } from './consts/paymentStatus'
import { paymentTypes } from './consts/paymentTypes'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'

const PaymentForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    clientId: '-1',
    price: 0.0,
    type: '-1',
    status: '-1',
    description: '',
    date: new Date(),
  }

  const [data, setData] = React.useState(defaultData)
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [isLoading, setIsLoading] = React.useState(true)

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
        <CommonSelectData
          id="client"
          label="Client"
          name="clientId"
          value={data.clientId}
          onChange={handleOnChange}
          setIsLoading={setIsLoading}
          model="clients"
          placeHolder="<Choisir un client>"
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <CommontDatePicker
          name="date"
          label="Date du paiement"
          value={data.date}
          handleOnChange={handleOnChange}
          handleChangeDate={handleChangeDate}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <TextField
          name="price"
          label="Montant"
          value={data.price}
          placeholder="Montant"
          variant="outlined"
          fullWidth
          sx={{ input: { textAlign: 'right' } }}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EuroIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <CommonSelect
          id="type"
          label="Type"
          value={data.type}
          name="type"
          placeHolder="<Choisir un type>"
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
          placeHolder="<Choisir un statut>"
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
