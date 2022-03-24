import { Alert, Grid } from '@mui/material'
import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import ClientForm2 from '../../components/Clients/ClientForm2'
import CommonBack from '../../components/common/CommonBack/CommonBack'
import { useFetchModel } from '../../utils/useFetchModel'
import { defaultData } from '../../components/Clients/consts/defaultData'

const ClientEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [client, setClient, isLoading, setIsLoading, error, setError] =
    useFetchModel(id, 'clients', defaultData)

  const onSubmit = async (data) => {
    //await updateClient(data, id)
    //await submitForm(event.target)
    console.log(data)
    navigate(-2, { replace: true })
  }

  if (isLoading) return <div>is loading...</div>

  return (
    client && (
      <>
        <ClientForm2 client={client} onSubmit={onSubmit} />
        <Grid item xs={12}>
          {error.isError && <Alert severity="error">{error.message}</Alert>}
          {error.isSuccess && <Alert severity="success">{error.message}</Alert>}
        </Grid>
        <CommonBack path="/" label="Fiche client" />
      </>
    )
  )
}

export default ClientEdit
