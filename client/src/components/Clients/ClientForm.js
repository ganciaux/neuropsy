import React from 'react'
import Grid from '@mui/material/Grid'
import { Alert, Button, TextField } from '@mui/material'
import { clientTypes } from '../Clients/consts/clientTypes'
import { defaultData } from '../Clients/consts/defaultData'
import { useFetchData } from '../../utils/useFetchData'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { useParams } from 'react-router-dom'
import { useSetData } from '../../utils/useSetData'
import Header from '../common/Header/Header'
import CommonBack from '../common/CommonBack/CommonBack'

const ClientForm = () => {
  const { id } = useParams()
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'clients', defaultData)
  const [handleSubmit, handleOnChange, handleChangeDate] = useSetData(
    data,
    setData,
    setError,
    'clients',
    id,
    defaultData,
    null,
    'birthdate',
  )

  if (error.isError === true) {
    return <Alert severity="error">{error.message}</Alert>
  }
  if (isLoading) {
    return <CommonLoader />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header title="Gestion client" />
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                name="name"
                placeholder="Nom"
                label="Nom"
                value={data.name}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                name="firstname"
                placeholder="Prénom"
                label="Prénom"
                value={data.firstname}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommontDatePicker
                name="birthdate"
                label="Date du naissance"
                value={data.birthdate}
                handleOnChange={handleOnChange}
                handleChangeDate={handleChangeDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonSelect
                id="clientType"
                label="Type"
                name="type"
                data={clientTypes}
                value={data.type}
                placeHolder="<Choisir un type>"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
                value={data.email}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                type="number"
                placeholder="Enter phone number"
                label="Phone"
                value={data.phone}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                name="city"
                placeholder="Ville"
                label="Ville"
                value={data.city}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                name="zip"
                placeholder="Code postal"
                label="Code postal"
                value={data.zip}
                variant="outlined"
                fullWidth
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Adresse"
                value={data.address}
                multiline
                rows={4}
                placeholder="Adresse"
                variant="outlined"
                fullWidth
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
              <CommonBack
                id={id}
                path={`/clients/details/${data.slug}`}
                label="Retour"
              />
              <Grid item xs={12}>
                {error.isError && (
                  <Alert severity="error">{error.message}</Alert>
                )}
                {error.isSuccess && (
                  <Alert severity="success">{error.message}</Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default ClientForm
