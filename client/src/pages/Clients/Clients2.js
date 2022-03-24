import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import { getData } from '../../api/api'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import ClientTable from '../../components/Clients/ClientTable'
import Header from '../../components/common/Header/Header'

const Clients = () => {
  const [clientsFiltered, setClientsFiltered] = useState([])
  const {
    isLoading,
    error,
    data: clients,
    isSuccess,
  } = useQuery('clients', () => getData('/clients'))

  useEffect(() => {
    setClientsFiltered(clients)
  }, [clients])

  if (isLoading) {
    return <CommonLoader />
  }
  if (error)
    return (
      <CommonAlert title="An error has occurred:" content={error.message} />
    )

  const handleFilter = (e) => {
    const pattern = e.target.value.toLowerCase()
    const result = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(pattern) ||
        client.firstname.toLowerCase().includes(pattern) ||
        client.email.toLowerCase().includes(pattern),
    )
    setClientsFiltered(result)
  }

  return (
    <Box>
      <Header title="Liste de clients" href="/clients/add" action="Ajouter" />
      <TextField
        name="search"
        placeholder="Recherche dans le nom, le prénom et l'email"
        label="Filtre de recherche"
        variant="outlined"
        fullWidth
        onChange={handleFilter}
      />

      <ClientTable data={clientsFiltered}></ClientTable>
    </Box>
  )
}

export default Clients
