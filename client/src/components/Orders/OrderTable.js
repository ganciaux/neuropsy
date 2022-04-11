import { Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonButtonNavigate from '../common/CommonButtonNavigate/CommonButtonNavigate'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import CommonDateRange from '../common/CommonDateRange/CommonDateRange'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { orderStatus } from './consts/orderStatus'
import { columns } from './consts/orderTableColumns'

export default function OrderTable({ data = [] }) {
  const [orders, setOrders] = useState(data)
  const [filters, setFilters] = useState({
    search: '',
    status: -1,
    dates: [null, null],
  })
  const orderColumns = columns(orders, setOrders)

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
      (order) =>
        order.clientId?._name.toLowerCase().includes(pattern) &&
        (order.status === filters.status || filters.status === -1) &&
        (!dates ||
          (dates &&
            new Date(filters.dates[0]).getTime() <=
              new Date(order.date).getTime() &&
            new Date(filters.dates[1]).getTime() >=
              new Date(order.date).getTime())),
    )

    setOrders(result)
  }, [data, filters])

  if (data.length === 0) {
    return (
      <>
        <CommonAlert title="" content="Aucune commande" severity="info" />
        <CommonButtonNavigate navigation="/orders/add" />
      </>
    )
  }
  return (
    <CommonDataGrid data={orders} columns={orderColumns}>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            name="search"
            placeholder="Recherche dans le nom"
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
            data={orderStatus}
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
          <CommonButtonNavigate navigation="/orders/add" />
        </Grid>
      </Grid>
    </CommonDataGrid>
  )
}
