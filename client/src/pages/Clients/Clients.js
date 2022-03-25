import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button, TextField } from '@mui/material'
import { getData } from '../../api/api'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import ClientTable from '../../components/Clients/ClientTable'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'

const Clients = () => {
  const title = 'Liste des clients'
  const [clientsFiltered, setClientsFiltered] = useState([])
  const {
    isLoading,
    isSuccess,
    error,
    data: clients,
  } = useQuery('clients', () => getData('/clients'))

  useEffect(() => {
    setClientsFiltered(clients)
  }, [clients])

  if (isLoading) {
    return <CommonLoader />
  }

  if (error) {
    return <CommonLoaderAlert title={title} alertContent={error.message} />
  }

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

  console.log('Clients: ', isLoading, isSuccess, error, clients)

  return (
    <CommonPageHeader title={title}>
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

      <ClientTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        data={clientsFiltered}
      ></ClientTable>
    </CommonPageHeader>
  )
}

export default Clients
