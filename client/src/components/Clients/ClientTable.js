import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/clientTableColumns'

export default function ClientTable({ data }) {
  const length = data ? data.length : 0

  const handleFilter = (e, data, setFilter) => {
    const pattern = e.target.value.toLowerCase()
    const result = data.filter(
      (client) =>
        client.name.toLowerCase().includes(pattern) ||
        client.firstname.toLowerCase().includes(pattern) ||
        client.email.toLowerCase().includes(pattern),
    )
    setFilter(result)
  }

  if (length === 0) {
    return <CommonAlert title="" content="Aucun client" severity="info" />
  }
  return (
    <CommonDataGrid
      data={data}
      columns={columns}
      model="clients"
      handleFilter={handleFilter}
      href="/clients/add"
      placeholder="Recherche dans le nom, le prénom et l'email"
    />
  )
}
