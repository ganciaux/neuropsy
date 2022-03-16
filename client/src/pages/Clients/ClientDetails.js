import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, List } from '@mui/material'
import Header from '../../components/common/Header/Header'
import CommonGrid from '../../components/common/CommonGrid/CommonGrid'
import CommonGridLine from '../../components/common/CommonGrid/CommonGridLine'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import { navItems } from '../../components/Clients/consts/navItems'
import { useFetchData } from '../../utils/useFetchData'

const ClientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData, isLoading, error, setError] = useFetchData(
    id,
    'clients',
  )

  if (isLoading) {
    return <CommonLoader />
  }

  return (
    <Box>
      <Header title="Détails clients" />
      <CommonGrid title="Fiche client">
        <CommonGridLine label="Nom" value={data.name} />
        <CommonGridLine label="Prénom" value={data.firstname} />
        <CommonGridLine label="Email" value={data.email} />
        <CommonGridLine label="Téléphone" value={data.phone} />
        <CommonGridLine label="Ville" value={data.city} />
        <CommonGridLine label="Code postal" value={data.zip} />
        <CommonGridLine label="Adresse" value={data.address} />
        <CommonGridLine label="Date de naissance" value={data._birthdate} />
        <CommonGridLine label="Age" value={data._age} />
        <CommonGridLine label="Description" value={data.description} />
      </CommonGrid>

      <List>
        {navItems.map((item, index) => (
          <Button key={item.id} onClick={() => navigate(item.route + '/' + id)}>
            {item.label}
          </Button>
        ))}
      </List>
    </Box>
  )
}

export default ClientDetails
