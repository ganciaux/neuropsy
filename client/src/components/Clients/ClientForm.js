import React from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import { clientTypes } from '../Clients/consts/clientTypes'
import { defaultData } from '../Clients/consts/defaultData'

import CommonSelect from '../common/CommonSelect/CommonSelect'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'
import { useFetchData } from '../../utils/useFetchData '
import CommonLoader from '../common/CommonLoader/CommonLoader'

const ClientForm = ({ id }) => {
  const isNew = id ? false : true
  const [data, setData, isLoading, error, setError] = useFetchData(
    id,
    'clients',
    defaultData,
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({ isSuccess: false, isError: false, message: '' })
    if (isNew) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/clients`, data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/clients/${data._id}`, data)
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
    setData({ ...data, birthdate: newValue })
  }

  console.log('clientForm', isLoading, data)

  if (isLoading) {
    return <CommonLoader />
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
              <CommontDatePicker
                name="birthdate"
                label="Date du naissance"
                value={data.birthdate}
                handleOnChange={handleOnChange}
                handleChangeDate={handleChangeDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonSelect
                id="clientType"
                label="Type"
                name="type"
                data={clientTypes}
                value={data.type}
                placeHolder="<Choisir un type>"
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
