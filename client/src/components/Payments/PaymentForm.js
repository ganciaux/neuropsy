import React from 'react'
import Grid from '@mui/material/Grid'
import { Alert, Button, InputAdornment, TextField } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { paymentStatus } from './consts/paymentStatus'
import { paymentTypes } from './consts/paymentTypes'
import { useFetchData } from '../../utils/useFetchData'
import { useSetData } from '../../utils/useSetData'
import { defaultData } from './consts/defaultData'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'
import { useParams } from 'react-router-dom'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import Header from '../common/Header/Header'
import CommonHeader from '../common/CommonHeader/CommonHeader'
import CommonBack from '../common/CommonBack/CommonBack'

const PaymentForm = () => {
  const { id, idClient } = useParams()
  const [client, setClient, isLoadingClient] = useFetchData(idClient, 'clients')
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'payments', defaultData)
  const [handleSubmit, handleOnChange, handleChangeDate] = useSetData(
    data,
    setData,
    setError,
    'payments',
    id,
    defaultData,
  )
  if (idClient) {
    defaultData.clientId = client?.id
  }
  const path = idClient ? `/clients/details/${client.slug}` : `/payments`
  if (error.isError === true) {
    return <Alert severity="error">{error.message}</Alert>
  }
  if (isLoading || isLoadingClient) {
    return <CommonLoader />
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header title="Gestion paiement" />
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
      <Grid item xs={6} sm={6} md={3}>
        <CommontDatePicker
          name="date"
          label="Date du paiement"
          value={data.date}
          handleOnChange={handleOnChange}
          handleChangeDate={handleChangeDate}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <TextField
          name="price"
          label="Montant"
          value={data.price}
          placeholder="Montant"
          variant="outlined"
          fullWidth
          sx={{ input: { textAlign: 'right' } }}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EuroIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <CommonSelect
          id="type"
          label="Type"
          value={data.type}
          name="type"
          placeHolder="<Choisir un type>"
          data={paymentTypes}
          onChange={handleOnChange}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <CommonSelect
          id="status"
          label="Statut"
          value={data.status}
          name="status"
          placeHolder="<Choisir un statut>"
          data={paymentStatus}
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
    </Grid>
  )
}

export default PaymentForm
