import React from 'react'
import Grid from '@mui/material/Grid'
import EuroIcon from '@mui/icons-material/Euro'
import TodayIcon from '@mui/icons-material/Today'
import { Alert, Button, InputAdornment, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useFetchData } from '../../utils/useFetchData '
import { useSetData } from '../../utils/useSetData'
import { defaultData } from './consts/defaultData'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import Header from '../common/Header/Header'

const ArticleForm = () => {
  const { id } = useParams()
  const [data, setData, isLoading, error, setError] = useFetchData(
    id,
    'articles',
    defaultData,
  )
  const [handleSubmit, handleOnChange] = useSetData(
    data,
    setData,
    setError,
    'articles',
    id,
    defaultData,
  )

  if (isLoading) {
    return <CommonLoader />
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header title="Gestion article" />
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} item>
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
            <Grid item xs={12}>
              <TextField
                name="label"
                placeholder="Label"
                label="Label"
                value={data.label}
                variant="outlined"
                fullWidth
                required
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                type="number"
                placeholder="Prix"
                label="Prix"
                value={data.price}
                variant="outlined"
                fullWidth
                required
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
            <Grid item xs={6}>
              <TextField
                name="sessions"
                type="number"
                placeholder="Rendez-vous"
                label="Rendez-vous"
                value={data.sessions}
                variant="outlined"
                fullWidth
                required
                sx={{ input: { textAlign: 'right' } }}
                onChange={handleOnChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <TodayIcon />
                    </InputAdornment>
                  ),
                }}
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
                required
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

export default ArticleForm
