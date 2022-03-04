import React from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'

const Clients = () => {
  const clients = [
    {
      id: 0,
      name: 'client1',
      firstname: 'firstname1',
    },
    {
      id: 1,
      name: 'client2',
    },
    {
      id: 3,
      name: 'client3',
    },
    {
      id: 4,
      name: 'client4',
    },
    {
      id: 5,
      name: 'client5',
    },
  ]
  return (
    <Grid container spacing={2}>
      {clients.map((client) => {
        return (
          <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={client.id}>
            <BasicCard header={client.name}></BasicCard>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Clients
