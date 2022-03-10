import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { InputAdornment, Stack, TextField, Typography } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from 'axios'
import CommonSelect from '../common/CommonSelect/CommonSelect'

const OrderLines = ({ lines, handleOnChange, setIsLoading }) => {
  const [articles, setArticles] = React.useState([])
  const [articlesSelect, setArticeSelect] = React.useState([])
  const handleAddLine = (e) => {
    lines.articles.push({
      articleId: '-1',
      description: 'line 1',
      quantity: 1,
      unitCost: 0,
      price: 0,
    })
    handleOnChange(lines.articles)
  }

  const onChange = (e, index) => {
    lines.articles[index] = {
      ...lines.articles[index],
      [e.target.name]: e.target.value,
    }
    let unitCost = lines.articles[index].unitCost
    const article = articles.filter((article) => article.id === e.target.value)
    if (article.length === 1) {
      unitCost = article[0].price
    }
    lines.articles[index] = {
      ...lines.articles[index],
      price: parseInt(unitCost) * parseInt(lines.articles[index].quantity),
      unitCost: parseInt(unitCost),
    }
    handleOnChange(lines.articles)
  }

  const handleDelete = (index) => {
    handleOnChange(lines.articles.splice(index, 1))
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => {
        setArticles(res.data.data)
        setArticeSelect(
          res.data.data.map((data) => {
            return { id: data._id, value: data._id, label: data._name }
          }),
        )
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          Détails: {}
          <AddCircleIcon size="small" onClick={handleAddLine} />
        </Typography>
      </Grid>
      {lines.articles?.map((line, index) => {
        return (
          <Grid container spacing={1} key={index} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={12} md={6}>
              <CommonSelect
                id="article"
                label="Article"
                name="articleId"
                value={line.articleId}
                data={articlesSelect}
                onChange={(e) => onChange(e, index)}
                setIsLoading={setIsLoading}
                placeHolder="<Choisir un article>"
              />
            </Grid>
            <Grid item xs={3} sm={3} md={2}>
              <TextField
                name={`quantity`}
                label="Quantité"
                type="number"
                value={line.quantity}
                placeholder="Montant"
                variant="outlined"
                fullWidth
                sx={{ input: { textAlign: 'right' } }}
                onChange={(e) => onChange(e, index)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <TextField
                name={`unitCost`}
                label="Prix unitaire"
                value={line.unitCost}
                placeholder="Prix unitaire"
                variant="outlined"
                fullWidth
                sx={{ input: { textAlign: 'right' } }}
                onChange={(e) => onChange(e, index)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EuroIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={5} sm={5} md={2}>
              <Stack direction="row" alignItems="center" gap={1}>
                <TextField
                  name={`price`}
                  label="Total"
                  value={line.price}
                  placeholder="Total"
                  variant="outlined"
                  fullWidth
                  sx={{ input: { textAlign: 'right' } }}
                  onChange={(e) => onChange(e, index)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EuroIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <DeleteForeverIcon
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleDelete(index)}
                  sx={{ cursor: 'pointer' }}
                />
              </Stack>
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}

export default OrderLines
