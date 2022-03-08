import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import Header from '../../components/common/Header/Header'
import PaymentTable from '../../components/Payments/PaymentTable'

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [paymentsFiltered, setPaymentsFiltered] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/payments')
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
      console.log(payment)
      return (
        payment.clientId?._name?.toLowerCase().includes(pattern) ||
        payment.price.toString().toLowerCase().includes(pattern)
      )
    })
    console.log(result)
    setPaymentsFiltered(result)
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
      <PaymentTable data={paymentsFiltered} />
    </Box>
  )
}

export default Payments
