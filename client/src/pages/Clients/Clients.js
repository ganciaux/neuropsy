import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import axios from 'axios'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EuroIcon from '@mui/icons-material/Euro'
import Header from '../../components/common/Header/Header'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import DataLineAction from '../../components/common/DataLine/DataLineAction'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [clientsFiltered, setClientsFiltered] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/clients')
      .then((res) => {
        console.log(res)
        setClients(res.data.data)
        setClientsFiltered(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  const handleFilter = (e) => {
    const result = clients.filter(
      (client) =>
        client.name.includes(e.target.value) ||
        client.firstname.includes(e.target.value) ||
        client.email.includes(e.target.value),
    )
    setClientsFiltered(result)
  }

  const getContent = (client) => {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          {client.name} {client.firstname}
        </Typography>
        <DataLineIcon icon={<AlternateEmailIcon />} text={client.email} />
        <DataLineIcon icon={<PhoneIphoneIcon />} text={client.phone} />
        <DataLineIcon icon={<CalendarTodayIcon />} text="Rendez-vous..." />
        <DataLineIcon icon={<EuroIcon />} text="Paiements..." />
      </>
    )
  }

  const getAction = (id) => {
    return (
      <>
        <DataLineAction url="/clients/details" id={id} label="Détails" />
        <DataLineAction url="/clients/edit" id={id} label="Modifier" />
      </>
    )
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
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
        {clientsFiltered.map((client) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={client.id}>
              <BasicCard
                header=""
                content={getContent(client)}
                actions={getAction(client.slug)}
              ></BasicCard>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Clients
