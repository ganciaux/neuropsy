import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonButtonNavigate from '../common/CommonButtonNavigate/CommonButtonNavigate'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/paymentTableColumns'

export default function PaymentTable({ data = [] }) {
  const [payments, setPayments] = useState(data)
  const paymentColumns = columns(payments, setPayments)
  const [filters, setFilters] = useState({
    search: '',
  })
  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const pattern = filters.search.toLowerCase()
    const result = data.filter(
      (payment) =>
        payment.clientId?._name?.toLowerCase().includes(pattern) ||
        payment.price?.toString().toLowerCase().includes(pattern),
    )
    setPayments(result)
  }, [data, filters])

  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun payment" severity="info" />
  }
  return (
    <CommonDataGrid data={payments} columns={paymentColumns}>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            name="search"
            placeholder="Recherche dans le nom du client et le prix"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleOnChange}
          />
        </Grid>
        <Grid xs={12} item>
          <CommonButtonNavigate navigation="/payments/add" />
        </Grid>
      </Grid>
    </CommonDataGrid>
  )
}
