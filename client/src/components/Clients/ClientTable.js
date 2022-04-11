import { Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonButtonNavigate from '../common/CommonButtonNavigate/CommonButtonNavigate'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/clientTableColumns'

export default function ClientTable({ data = [] }) {
  const [clients, setClients] = useState(data)
  const clientColumns = columns(clients, setClients)
  const [filters, setFilters] = useState({
    search: '',
  })
  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const pattern = filters.search.toLowerCase()
    const result = data.filter(
      (client) =>
        client.name.toLowerCase().includes(pattern) ||
        client.firstname.toLowerCase().includes(pattern) ||
        client.email.toLowerCase().includes(pattern),
    )

    setClients(result)
  }, [data, filters])

  if (data.length === 0) {
    return (
      <>
        <CommonAlert title="" content="Aucun client" severity="info" />
        <CommonButtonNavigate navigation="/clients/add" />
      </>
    )
  }

  return (
    <CommonDataGrid data={clients} columns={clientColumns}>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            name="search"
            placeholder="Recherche dans le nom, le prénom et l'email"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleOnChange}
          />
        </Grid>
        <Grid xs={12} item>
          <CommonButtonNavigate navigation="/clients/add" />
        </Grid>
      </Grid>
    </CommonDataGrid>
  )
}
