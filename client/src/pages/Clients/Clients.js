import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import axios from 'axios'
import { Button, Link, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EuroIcon from '@mui/icons-material/Euro'
import CommonButton from '../../components/common/CommonButton/CommonButton'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [filter, setFilter] = useState('')
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
    console.log(client)
    return (
      <>
        <Typography variant="h6" gutterBottom>
          {client.name} {client.firstname}
        </Typography>
        {getLine(<AlternateEmailIcon />, client.email)}
        {getLine(<PhoneIphoneIcon />, client.phone)}
        {getLine(<CalendarTodayIcon />, 'Rendez-vous...')}
        {getLine(<EuroIcon />, 'Paiments...')}
      </>
    )
  }

  const getLine = (icon, text) => {
    return (
      <Stack direction="row" alignItems="center" gap={1}>
        {icon}
        <Typography variant="body1">{text}</Typography>
      </Stack>
    )
  }

  const getAction = (id) => {
    return (
      <>
        <Link href={`/clients/details/${id}`} underline="hover">
          <Button size="small">Details</Button>
        </Link>
        <Link href={`/clients/edit/${id}`} underline="hover">
          <Button size="small">Modifier</Button>
        </Link>
      </>
    )
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom component="div">
        Liste des clients
        <Link href="/clients/add" underline="hover">
          <CommonButton variant="contained">Ajouter</CommonButton>
        </Link>
      </Typography>
      <TextField
        name="search"
        placeholder="Filtre"
        label="Filtre"
        variant="outlined"
        fullWidth
        required
        onChange={handleFilter}
      />
      <Grid container spacing={2}>
        {clientsFiltered.map((client) => {
          console.log(client)
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
