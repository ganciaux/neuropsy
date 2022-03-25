import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Box } from '@mui/material'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import { useFetchData } from '../../utils/useFetchData'
import ClientFormDetails from '../../components/Clients/ClientFormDetails'

const ClientDetails = () => {
  const { id } = useParams()
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'clients/details')

  if (error.isError === true) {
    return <Alert severity="error">{error.message}</Alert>
  }

  if (isLoading || !data) {
    return <CommonLoader />
  }

  return (
    <Box>
      <ClientFormDetails client={data} />
    </Box>
  )
}

export default ClientDetails
