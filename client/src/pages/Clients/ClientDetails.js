import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import Header from '../../components/common/Header/Header'
import CommonGrid from '../../components/common/CommonGrid/CommonGrid'
import CommonGridLine from '../../components/common/CommonGrid/CommonGridLine'
import { format, parseISO } from 'date-fns'

const ClientDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState({})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/clients/${id}`)
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
      <Header title="Details clients" />
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <CommonGrid title="Fiche article">
          <CommonGridLine label="Nom" value={data.name} />
          <CommonGridLine label="Prénom" value={data.firstname} />
          <CommonGridLine label="Email" value={data.email} />
          <CommonGridLine label="Téléphone" value={data.phone} />
          <CommonGridLine label="Ville" value={data.city} />
          <CommonGridLine label="Code postal" value={data.zip} />
          <CommonGridLine label="Adresse" value={data.address} />
          <CommonGridLine label="Date de naissance" value={data._birthdate} />
          <CommonGridLine label="Age" value={data._age} />
          <CommonGridLine label="Description" value={data.name} />
        </CommonGrid>
      )}
    </Box>
  )
}

export default ClientDetails
