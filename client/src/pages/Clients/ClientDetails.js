import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Grid, Typography } from '@mui/material'

const ClientDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState({})

  console.log('ClientDetails', id)

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/clients/${id}`)
      .then((res) => {
        setIsLoading(false)
        setData(res.data.data)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err.response.data)
      })
  }, [id])

  return (
    <Box>
      <Typography variant="h3" gutterBottom component="div">
        Details client
      </Typography>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div">
              Fiche client
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                Nom: {data.name}
              </Grid>
              <Grid item xs={6}>
                Prénom: {data.firstname}
              </Grid>
              <Grid item xs={6}>
                Email: {data.email}
              </Grid>
              <Grid item xs={6}>
                Adresse: {data.address}
              </Grid>
              <Grid item xs={6}>
                Date de naissance: {data.birthdate}
              </Grid>
            </Grid>
            <Typography variant="h6" component="div">
              Rendez-vous
            </Typography>
            <Typography variant="h6" component="div">
              Payment
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default ClientDetails
