import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonButtonNavigate from '../common/CommonButtonNavigate/CommonButtonNavigate'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/paymentTableColumns'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import CommonDateRange from '../common/CommonDateRange/CommonDateRange'
import { paymentStatus } from './consts/paymentStatus'

export default function PaymentTable({ data = [] }) {
  const [payments, setPayments] = useState(data)
  const paymentColumns = columns(payments, setPayments)
  const [filters, setFilters] = useState({
    search: '',
    status: -1,
    dates: [null, null],
  })
  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleOnChangeRange = (dates) => {
    setFilters({ ...filters, dates })
  }

  useEffect(() => {
    const pattern = filters.search.toLowerCase()
    const dates = filters.dates[0] != undefined && filters.dates[1] != undefined
    const result = data.filter(
      (payment) =>
        payment.clientId?._name?.toLowerCase().includes(pattern) &&
        payment.price?.toString().toLowerCase().includes(pattern) &&
        (payment.status === filters.status || filters.status === -1) &&
        (!dates ||
          (dates &&
            new Date(filters.dates[0]).getTime() <=
              new Date(payment.date).getTime() &&
            new Date(filters.dates[1]).getTime() >=
              new Date(payment.date).getTime())),
    )
    setPayments(result)
  }, [data, filters])

  if (data.length === 0) {
    return (
      <>
        <CommonAlert title="" content="Aucun paiement" severity="info" />
        <CommonButtonNavigate navigation="/payments/add" />
      </>
    )
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
          <CommonSelect
            name="status"
            label="Statut"
            id="selectStatus"
            data={paymentStatus}
            onChange={handleOnChange}
            value={filters.status}
            defaultValue
            all
          />
        </Grid>
        <Grid item xs={12}>
          <CommonDateRange
            onChange={handleOnChangeRange}
            dates={filters.dates}
            clearDate={() => setFilters({ ...filters, dates: [null, null] })}
          />
        </Grid>
        <Grid xs={12} item>
          <CommonButtonNavigate navigation="/payments/add" />
        </Grid>
      </Grid>
    </CommonDataGrid>
  )
}
