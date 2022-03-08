import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField, Typography } from '@mui/material'

const ArticleForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    name: '',
    label: '',
    price: '',
    sessions: '',
    description: '',
  }

  useEffect(() => {
    if (isNew === false) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/articles/${id}`)
        .then((res) => {
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
        .post(`${process.env.REACT_APP_API_URL}/articles`, data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/articles/${data._id}`, data)
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
      <Grid item xs={12}>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
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
              <TextField
                name="label"
                placeholder="Label"
                label="Label"
                value={data.label}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                type="number"
                placeholder="Prix"
                label="Prix"
                value={data.price}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="sessions"
                type="number"
                placeholder="Rendez-vous"
                label="Rendez-vous"
                value={data.sessions}
                variant="outlined"
                fullWidth
                required
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
                required
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

export default ArticleForm
