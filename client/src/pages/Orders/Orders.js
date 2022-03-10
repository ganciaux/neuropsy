import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Header from '../../components/common/Header/Header'
import OrderTable from '../../components/Orders/OrderTable'
import CommonDialog from '../../components/common/CommonDialog/CommonDialog'
const Orders = () => {
  const [orders, setOrders] = useState([])
  const [ordersFiltered, setOrdersFiltered] = useState([])
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({})

  const handleCloseOk = () => {
    setOpen(false)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/orders/${data._id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
        const newOrders = ordersFiltered.filter((order) => {
          return order._id !== data._id
        })
        setOrdersFiltered(newOrders)
      })
      .catch((err) => {
        setError({ isError: true, message: err.response.data.message })
      })
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  const getContent = () => {
    return (
      <>
        <div>Date: {data._date}</div>
        <div>Nom: {data.clientId?._name}</div>
        <div>Montant: {data.price}€</div>
        <div>Description: {data.description}</div>
      </>
    )
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/orders`)
      .then((res) => {
        setOrders(res.data.data)
        setOrdersFiltered(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  const handleFilter = (e) => {
    const pattern = e.target.value.toLowerCase()
    const result = orders.filter((order) => {
      return (
        order.clientId?._name?.toLowerCase().includes(pattern) ||
        order.price.toString().toLowerCase().includes(pattern)
      )
    })
    setOrdersFiltered(result)
  }

  const handleDelete = (row) => {
    setOpen(true)
    setData(row)
  }

  return (
    <Box>
      <Header title="Liste des commandes" href="/orders/add" action="Ajouter" />
      {orders.length === 0 && <Typography>Aucune commande</Typography>}
      {orders.length > 0 && (
        <>
          <TextField
            name="search"
            placeholder="Recherche dans le nom et le prix"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleFilter}
          />
          <OrderTable
            id={data._id}
            data={ordersFiltered}
            handleDelete={handleDelete}
            setError={setError}
          />
          <CommonDialog
            title="Supprimer la commande ?"
            open={open}
            content={getContent}
            handleCloseOk={handleCloseOk}
            handleCloseCancel={handleCloseCancel}
          />
          <Grid item xs={12}>
            {error.isError && <Alert severity="error">{error.message}</Alert>}
            {error.isSuccess && (
              <Alert severity="success">{error.message}</Alert>
            )}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Orders
