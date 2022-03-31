import React, { useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/orderTableColumns'

export default function OrderTable({ data }) {
  const [orders, setOrders] = useState(data)
  const orderColumn = columns(orders, setOrders)
  const length = data ? data.length : 0

  const handleFilter = (e, data, setFilter) => {
    const pattern = e.target.value.toLowerCase()
    const result = data.filter(
      (order) =>
        order.name.toLowerCase().includes(pattern) ||
        order.label.toLowerCase().includes(pattern),
    )
    setFilter(result)
  }

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
    />
  )
}
