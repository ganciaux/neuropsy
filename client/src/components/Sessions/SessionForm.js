import React from 'react'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { sessionStatus } from './consts/sessionStatus'
import { sessionTypes } from './consts/sessionTypes'
import CommontDateTimePicker from '../common/CommonDatePicker/CommonDateTimePicker'
import { useParams } from 'react-router-dom'
import { useFetchData } from '../../utils/useFetchData'
import { useSetData } from '../../utils/useSetData'
import { defaultData } from './consts/defaultData'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'
import Header from '../common/Header/Header'
import CommonHeader from '../common/CommonHeader/CommonHeader'
import CommonBack from '../common/CommonBack/CommonBack'

const SessionForm = () => {
  const { id, idClient } = useParams()
  const [client, setClient, isLoadingClient] = useFetchData(idClient, 'clients')
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'sessions', defaultData)
  const [handleSubmit, handleOnChange, handleChangeDate] = useSetData(
    data,
    setData,
    setError,
    'sessions',
    id,
    defaultData,
  )
  const path = idClient ? `/clients/details/${client.slug}` : `/sessions`
  if (idClient) {
    defaultData.clientId = client?.id
  }
  if (error.isError === true) {
    return <Alert severity="error">{error.message}</Alert>
  }
  if (isLoading || isLoadingClient) {
    return <CommonLoader />
  }

  return (
    <CommonGridForm>
      <Grid item xs={12}>
        <Header title="Gestion rendez-vous" />
      </Grid>
      <Grid item xs={12}>
        {idClient && <CommonHeader title={client._name} />}
        {!idClient && (
          <CommonSelectData
            id="client"
            label="Client"
            name="clientId"
            value={data.clientId}
            onChange={handleOnChange}
            setIsLoading={setIsLoading}
            model="clients"
            placeHolder="<Choisir un client>"
          />
        )}
      </Grid>
      <Grid item xs={6} sm={6}>
        <CommontDateTimePicker
          name="date"
          label="Date du rendez-vous"
          value={data.date}
          handleOnChange={handleOnChange}
          handleChangeDate={handleChangeDate}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CommonSelect
          id="status"
          label="Statut"
          value={data.status}
          name="status"
          data={sessionStatus}
          placeHolder="<Choisir un status>"
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <CommonSelect
          id="type"
          label="Type"
          value={data.type}
          name="type"
          placeHolder="<Choisir un type>"
          data={sessionTypes}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          label="Description"
          value={data.description}
          multiline
          rows={4}
          placeholder="Description"
          variant="outlined"
          fullWidth
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {!id && 'Ajouter'}
          {id && 'Modifier'}
        </Button>
        <CommonBack path={path} label="Retour" />
      </Grid>
      <Grid item xs={12}>
        {error.isError && <Alert severity="error">{error.message}</Alert>}
        {error.isSuccess && <Alert severity="success">{error.message}</Alert>}
      </Grid>
    </CommonGridForm>
  )
}

export default SessionForm
