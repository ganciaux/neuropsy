import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { orderStatus } from './consts/orderStatus'
import { columns } from './consts/orderTableColumns'

export default function OrderTable({ data }) {
  const [orders, setOrders] = useState(data)
  const [filters, setFilters] = useState({ search: '', status: -1 })
  const orderColumn = columns(orders, setOrders)
  const length = data ? data.length : 0

  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleFilter = (e, data, setFilter) => {
    const pattern = e.target.value.toLowerCase()
    const result = data.filter((order) =>
      order.clientId?._name.toLowerCase().includes(pattern),
    )
    setFilter(result)
  }

  useEffect(() => {
    const pattern = filters.search.toLowerCase()
    const result = data.filter(
      (order) =>
        order.clientId?._name.toLowerCase().includes(pattern) &&
        (order.status === filters.status || filters.status === -1),
    )
    setOrders(result)
  }, [filters])

  if (length === 0) {
    return <CommonAlert title="" content="Aucun rendez-vous" severity="info" />
  }
  return (
    <CommonDataGrid
      data={orders}
      columns={orderColumn}
      model="orders"
      handleFilter={handleFilter}
      href="/orders/add"
      placeholder="Recherche dans le nom"
    >
      <Grid container spacing={1}>
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
      </Grid>
    </CommonDataGrid>
  )
}
