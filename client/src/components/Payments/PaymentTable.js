import React, { useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/paymentTableColumns'

export default function PaymentTable({ data }) {
  const [payments, setPayments] = useState(data)
  const paymentColumn = columns(payments, setPayments)

  const length = data ? data.length : 0

  const handleFilter = (e, data, setFilter) => {
    const pattern = e.target.value.toLowerCase()
    const result = data.filter(
      (payment) =>
        payment.clientId?._name?.toLowerCase().includes(pattern) ||
        payment.price?.toString().toLowerCase().includes(pattern),
    )
    setFilter(result)
  }

  if (length === 0) {
    return <CommonAlert title="" content="Aucun payment" severity="info" />
  }
  return (
    <>
      <CommonDataGrid
        data={payments}
        columns={paymentColumn}
        model="payments"
        handleFilter={handleFilter}
        href="/payments/add"
        placeholder="Recherche dans le nom du client et le prix"
      />
    </>
  )
}
