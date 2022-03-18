import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, List, Typography } from '@mui/material'
import Header from '../../components/common/Header/Header'
import CommonGrid from '../../components/common/CommonGrid/CommonGrid'
import CommonGridLine from '../../components/common/CommonGrid/CommonGridLine'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import { navItems } from '../../components/Clients/consts/navItems'
import { useFetchData } from '../../utils/useFetchData'
import PaymentTable from '../../components/Payments/PaymentTable'
import SessionTable from '../../components/Sessions/SessionTable'
import OrderTable from '../../components/Orders/OrderTable'

const ClientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState({
    sesions: false,
    payments: false,
    order: false,
  })
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'clients/details')

  const handleToggle = (e, name) => {
    setToggle({ ...toggle, [name]: !toggle[name] })
  }

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

      <Typography variant="h6" component="div">
        Rendez-vous: {data.sessions.length}
        <Button onClick={(e) => handleToggle(e, 'sessions')}>toggle</Button>
        <SessionTable data={data.sessions} />
      </Typography>
      <Typography variant="h6" component="div">
        Paiments: {data.payments.length}
        <PaymentTable data={data.payments} />
      </Typography>
      <Typography variant="h6" component="div">
        Commandes: {data.orders.length}
        <OrderTable data={data.orders} />
      </Typography>
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
