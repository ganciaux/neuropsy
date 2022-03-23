import { Alert } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import ClientForm2 from '../../components/Clients/ClientForm2'
import CommonBack from '../../components/common/CommonBack/CommonBack'
import { useFetchModel } from '../../utils/useFetchModel'

const ClientEdit = () => {
  const { id } = useParams()
  const back = '/'
  const [client, setClient, isLoading, setIsLoading, error, setError] =
    useFetchModel(id, path, defaultData)
  //const history = useHistory()

  const onSubmit = async (data) => {
    await updateClient(data, id)
    //history.push("/")
  }

  if (isLoading) return <div>is loading...</div>
  return (
    client && (
      <>
        <ClientForm2
          client={client}
          back={back}
          onChange=""
          onChangeDate=""
          onSubmit={onSubmit}
        />
        <Grid item xs={12}>
          {error.isError && <Alert severity="error">{error.message}</Alert>}
          {error.isSuccess && <Alert severity="success">{error.message}</Alert>}
        </Grid>
        <CommonBack path={path} label="Fiche client" />
      </>
    )
  )
}

export default ClientEdit
