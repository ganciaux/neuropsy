import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button, TextField } from '@mui/material'
import { getData } from '../../api/api'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import ClientTable from '../../components/Clients/ClientTable'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

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
    <CommonPageHeader title="Gestion client">
      <TextField
        name="search"
        placeholder="Recherche dans le nom, le prénom et l'email"
        label="Filtre de recherche"
        variant="outlined"
        fullWidth
        onChange={handleFilter}
      />
      <Button
        sx={{ marginTop: '10px' }}
        type="button"
        variant="contained"
        color="primary"
        href="/clients/add"
      >
        Ajouter
      </Button>

      <ClientTable data={clientsFiltered}></ClientTable>
    </CommonPageHeader>
  )
}

export default Clients
