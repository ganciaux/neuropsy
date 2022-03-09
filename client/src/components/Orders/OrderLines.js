import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Button, InputAdornment, TextField } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'

const OrderLines = ({ lines, handleDelete, setIsLoading }) => {
  const [data, setData] = React.useState(lines)
  const [error, setError] = React.useState({ isError: false, message: '' })

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  console.log(data)
  return (
    <>
      {data?.map((line, index) => {
        return (
          <Grid container spacing={1} key={index}>
            <div>Détails</div>
            <Grid item xs={6} sm={6} md={3}>
              <CommonSelectData
                id="article"
                label="Article"
                name="article"
                value={-1}
                onChange={handleOnChange}
                setIsLoading={setIsLoading}
                model="articles"
                placeHolder="<Choisir un article>"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <TextField
                name="quantity"
                label="Quantité"
                value={data.price}
                placeholder="Montant"
                variant="outlined"
                fullWidth
                sx={{ textAlign: 'right' }}
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
              <TextField
                name="price"
                label="Montant"
                value={data.price}
                placeholder="Montant"
                variant="outlined"
                fullWidth
                sx={{ textAlign: 'right' }}
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
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}

export default OrderLines
