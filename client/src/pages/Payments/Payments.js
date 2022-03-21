import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Header from '../../components/common/Header/Header'
import PaymentTable from '../../components/Payments/PaymentTable'
import CommonDialog from '../../components/common/CommonDialog/CommonDialog'
const Payments = () => {
  const [total, setTotal] = useState(0)
  const [payments, setPayments] = useState([])
  const [paymentsFiltered, setPaymentsFiltered] = useState([])
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({})

  const handleCloseOk = () => {
    setOpen(false)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/payments/${data._id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
        const newPayments = paymentsFiltered.filter((payment) => {
          return payment._id !== data._id
        })
        setPaymentsFiltered(newPayments)
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
      </>
    )
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/payments`)
      .then((res) => {
        setPayments(res.data.data)
        setPaymentsFiltered(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  const handleFilter = (e) => {
    const pattern = e.target.value.toLowerCase()
    const result = payments.filter((payment) => {
      return (
        payment.clientId?._name?.toLowerCase().includes(pattern) ||
        payment.price.toString().toLowerCase().includes(pattern)
      )
    })
    setPaymentsFiltered(result)
  }

  const handleDelete = (row) => {
    setOpen(true)
    setData(row)
  }

  return (
    <Box>
      <Header
        title="Liste des paiements"
        href="/payments/add"
        action="Ajouter"
      />
      <TextField
        name="search"
        placeholder="Recherche dans le nom et le prix"
        label="Filtre de recherche"
        variant="outlined"
        fullWidth
        onChange={handleFilter}
      />
      <PaymentTable data={paymentsFiltered} handleDelete={handleDelete} />
      <CommonDialog
        title="Supprimer le paiement ?"
        open={open}
        content={getContent}
        handleCloseOk={handleCloseOk}
        handleCloseCancel={handleCloseCancel}
      />
    </Box>
  )
}

export default Payments
