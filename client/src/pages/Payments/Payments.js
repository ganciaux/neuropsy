import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import axios from 'axios'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EuroIcon from '@mui/icons-material/Euro'
import Header from '../../components/common/Header/Header'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import DataLineAction from '../../components/common/DataLine/DataLineAction'
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
    const result = payments.filter(
      (client) =>
        client.name.includes(e.target.value) ||
        client.firstname.includes(e.target.value) ||
        client.email.includes(e.target.value),
    )
    setPaymentsFiltered(result)
  }

  return (
    <Box>
      <Header
        title="Liste des paiments"
        href="/payments/add"
        action="Ajouter"
      />
      <TextField
        name="search"
        placeholder="Recherche dans le nom, le prénom, l'email et le prix"
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
