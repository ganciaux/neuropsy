import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import {
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const ClientForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    name: '',
    firstname: '',
    type: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    comment: '',
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
  }
  const handleChangeDate = (newValue) => {
    setData({ ...data, birthdate: newValue })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs md></Grid>
      <Grid item xs={12} md={10}>
        <Typography gutterBottom variant="h5">
          {isNew && 'Nouveau patient'}
          {!isNew && 'Modification'}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        ></Typography>
        <form>
          <Grid container spacing={1}>
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

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  name="birthdate"
                  label="Date desktop"
                  inputFormat="dd/MM/yyyy"
                  value={data.birthdate}
                  fullWidth
                  onChange={handleChangeDate}
                  renderInput={(params) => (
                    <Grid xs={12} sm={6} item>
                      <TextField {...params} onChange={handleOnChange} />
                    </Grid>
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                value={data.email}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                type="number"
                placeholder="Enter phone number"
                label="Phone"
                value={data.phone}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="comment"
                label="Commentaire"
                value={data.comment}
                multiline
                rows={4}
                placeholder="Type your comment here"
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                {isNew && 'Ajouter'}
                {!isNew && 'Modifier'}
              </Button>
            </Grid>
            {error.isError && <Alert severity="error">{error.message}</Alert>}
            {error.isSuccess && (
              <Alert severity="success">{error.message}</Alert>
            )}
          </Grid>
        </form>
      </Grid>
      <Grid item xs md></Grid>
    </Grid>
  )
}

export default ClientForm
