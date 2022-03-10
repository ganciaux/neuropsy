import React, { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { orderStatus } from './consts/orderStatus'
import OrderLines from './OrderLines'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'

const OrderForm = ({ id }) => {
  const isNew = id ? false : true
  const defaultData = {
    clientId: '-1',
    price: 0.0,
    status: 0,
    description: '',
    date: new Date(),
    articles: [
      {
        articleId: '-1',
        description: '',
        quantity: 1,
        unitCost: 0,
        price: 0,
      },
    ],
  }

  const [data, setData] = React.useState(defaultData)
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [isLoading, setIsLoading] = React.useState(true)

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleLineOnChange = (articles) => {
    setData({
      ...data,
      articles,
    })
    //console.log('Form on change:')
    //console.log(data.articles)
  }

  const handleChangeDate = (newValue) => {
    setData({ ...data, date: newValue })
  }

  useEffect(() => {
    if (isNew === false) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/orders/${id}`)
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

    const order = {
      ...data,
      articles: data.articles.map((article) => {
        if (article.articleId === '-1') {
          delete article.articleId
        }
        return article
      }),
    }
    setError({ isSuccess: false, isError: false, message: '' })
    if (isNew) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/orders`, order)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/orders/${data._id}`, order)
        .then((res) => {
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    }
  }

  console.log('Form:', data)

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
      <Grid item xs={6} sm={6}>
        <CommontDatePicker
          name="date"
          label="Date de la commande"
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
          placeHolder="<Choisir un statut>"
          data={orderStatus}
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
      <OrderLines
        lines={data}
        handleOnChange={handleLineOnChange}
        setIsLoading={setIsLoading}
      />
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

export default OrderForm
