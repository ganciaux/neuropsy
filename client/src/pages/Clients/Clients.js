import React from 'react'
import { Link, TextField } from '@mui/material'
import { Box } from '@mui/system'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import { useFetchDataList } from '../../utils/useFetchDataList'
import Header from '../../components/common/Header/Header'
import ClientTable from '../../components/Clients/ClientTable'
import ListAltIcon from '@mui/icons-material/ListAlt'
import EditIcon from '@mui/icons-material/Edit'

const Clients = () => {
  const [
    clients,
    setClients,
    clientsFiltered,
    setClientsFiltered,
    isLoading,
    error,
    setError,
  ] = useFetchDataList('clients')

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

  if (isLoading) {
    return <CommonLoader />
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
