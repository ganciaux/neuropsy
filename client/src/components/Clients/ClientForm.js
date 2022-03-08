import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField, Typography } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ClientType from './ClientType'

const ClientForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    name: '',
    firstname: '',
    type: 0,
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    description: '',
    birthdate: new Date(),
  }

  useEffect(() => {
    if (isNew === false) {
      axios
        .get(`http://localhost:5001/api/clients/${id}`)
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
        .post('http://localhost:5001/api/clients', data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`http://localhost:5001/api/clients/${data._id}`, data)
        .then((res) => {
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    }
  }

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                name="name"
                placeholder="Nom"
                label="Nom"
                value={data.name}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                name="firstname"
                placeholder="Prénom"
                label="Prénom"
                value={data.firstname}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  name="birthdate"
                  label="Date de naissance"
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
            <Grid item xs={12} sm={6}>
              <ClientType
                id="clientType"
                name="type"
                value={data.type}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                value={data.email}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                type="number"
                placeholder="Enter phone number"
                label="Phone"
                value={data.phone}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                name="city"
                placeholder="Ville"
                label="Ville"
                value={data.city}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                name="zip"
                placeholder="Code postal"
                label="Code postal"
                value={data.zip}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Adresse"
                value={data.address}
                multiline
                rows={4}
                placeholder="Adresse"
                variant="outlined"
                fullWidth
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
              <Grid item xs={12}>
                {error.isError && (
                  <Alert severity="error">{error.message}</Alert>
                )}
                {error.isSuccess && (
                  <Alert severity="success">{error.message}</Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default ClientForm
