import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { sessionStatus } from './consts/sessionStatus'
import { sessionTypes } from './consts/sessionTypes'
import CommontDateTimePicker from '../common/CommonDatePicker/CommonDateTimePicker'

const SessionForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    clientId: '-1',
    type: '-1',
    status: '-1',
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
        .get(`${process.env.REACT_APP_API_URL}/sessions/${id}`)
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
        .post(`${process.env.REACT_APP_API_URL}/sessions`, data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/sessions/${data._id}`, data)
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
          value={data?.clientId}
          name="clientId"
          data={clients}
          placeHolder="<Choisir un client>"
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CommontDateTimePicker
          name="date"
          label="Date du rendez-vous"
          value={data.date}
          handleOnChange={handleOnChange}
          handleChangeDate={handleChangeDate}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CommonSelect
          id="status"
          label="Statut"
          value={data.status}
          name="status"
          data={sessionStatus}
          placeHolder="<Choisir un status>"
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <CommonSelect
          id="type"
          label="Type"
          value={data.type}
          name="type"
          placeHolder="<Choisir un type>"
          data={sessionTypes}
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

export default SessionForm
