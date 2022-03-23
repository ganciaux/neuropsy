import React from 'react'
import Grid from '@mui/material/Grid'
import { Button, TextField } from '@mui/material'
import { clientTypes } from '../Clients/consts/clientTypes'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import CommontDatePicker from '../common/CommonDatePicker/CommontDatePicker'

const ClientForm2 = ({ client, onChange, onChangeDate, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ? todo.text : '' },
  })

  const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} item>
          <TextField
            name="name"
            placeholder="Nom"
            label="Nom"
            value={client.name}
            variant="outlined"
            fullWidth
            required
            onChange={onChange}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="firstname"
            placeholder="Prénom"
            label="Prénom"
            value={client.firstname}
            variant="outlined"
            fullWidth
            required
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommontDatePicker
            name="birthdate"
            label="Date du naissance"
            value={client.birthdate}
            onChange={onChange}
            onChangeDate={onChangeDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CommonSelect
            id="clientType"
            label="Type"
            name="type"
            data={clientTypes}
            value={client.type}
            placeHolder="<Choisir un type>"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            value={client.email}
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            type="number"
            placeholder="Enter phone number"
            label="Phone"
            value={client.phone}
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="city"
            placeholder="Ville"
            label="Ville"
            value={client.city}
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid xs={12} sm={6} item>
          <TextField
            name="zip"
            placeholder="Code postal"
            label="Code postal"
            value={client.zip}
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Adresse"
            value={client.address}
            multiline
            rows={4}
            placeholder="Adresse"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            value={client.description}
            multiline
            rows={4}
            placeholder="Description"
            variant="outlined"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Sauvegarder
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ClientForm2
