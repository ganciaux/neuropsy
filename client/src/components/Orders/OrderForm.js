import React from 'react'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField, Typography } from '@mui/material'
import CommonGridForm from '../common/CommonGrid/CommonGridForm'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { orderStatus } from './consts/orderStatus'
import OrderLines from './OrderLines'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'
import { useParams } from 'react-router-dom'
import { defaultData } from './consts/defaultData'
import { useFetchData } from '../../utils/useFetchData'
import { useSetData } from '../../utils/useSetData'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import Header from '../common/Header/Header'
import CommonHeader from '../common/CommonHeader/CommonHeader'
import CommonBack from '../common/CommonBack/CommonBack'

const OrderForm = () => {
  const { id, idClient } = useParams()
  const [client, setClient, isLoadingClient] = useFetchData(idClient, 'clients')

  if (idClient) {
    defaultData.clientId = client?.id
  }

  const formatData = (data) => {
    return {
      ...data,
      articles: data.articles.map((article) => {
        if (article.articleId === '-1') {
          delete article.articleId
        }
        return article
      }),
    }
  }
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'orders', defaultData)
  const [handleSubmit, handleOnChange, handleChangeDate] = useSetData(
    data,
    setData,
    setError,
    'orders',
    id,
    defaultData,
    formatData,
    'date',
  )

  const handleLineOnChange = (articles) => {
    setData({
      ...data,
      articles,
    })
  }
  const path = idClient ? `/clients/details/${client.slug}` : `/orders`
  if (error.isError === true) {
    return <Alert severity="error">{error.message}</Alert>
  }
  if (isLoading || isLoadingClient) {
    return <CommonLoader />
  }
  return (
    <CommonGridForm>
      <Grid item xs={12}>
        <Header title="Gestion commande" />
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
        <CommontDatePicker
          name="date"
          label="Date de la commande"
          value={data.date}
          onChange={handleOnChange}
          onChangeDate={handleChangeDate}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CommonSelect
          id="status"
          label="Statut"
          value={data.status}
          name="status"
          placeHolder="<Choisir un statut>"
          data={orderStatus}
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
      <OrderLines
        lines={data}
        handleOnChange={handleLineOnChange}
        setIsLoading={setIsLoading}
      />
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

export default OrderForm
