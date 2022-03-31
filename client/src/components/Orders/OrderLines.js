import React from 'react'
import Grid from '@mui/material/Grid'
import { InputAdornment, Stack, TextField, Typography } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useFormQueryList } from '../../utils/useFormQueryList'
import CommonSelect from '../common/CommonSelect/CommonSelect'

const OrderLines = ({ control, data, setData }) => {
  const queryArticles = useFormQueryList('articles')
  const lineUpdate = (articles) => {
    setData({
      ...data,
      'data.articles': articles,
    })
  }
  const handleAddLine = (e) => {
    data.articles.push({
      articleId: -1,
      description: 'line 1',
      quantity: 1,
      unitCost: 0,
      price: 0,
    })
    lineUpdate(data.articles)
  }

  const onChange = (e, index) => {
    console.log('orderlines: onchange:', index, [e.target.name], e.target.value)
    data.articles[index] = {
      ...data.articles[index],
      [e.target.name]: e.target.value,
    }
    let unitCost = data.articles[index].unitCost
    const article = data.articles.filter(
      (article) => article.id === e.target.value,
    )
    if (article.length === 1) {
      unitCost = article[0].price
    }
    data.articles[index] = {
      ...data.articles[index],
      price: parseInt(unitCost) * parseInt(data.articles[index].quantity),
      unitCost: parseInt(unitCost),
    }
    lineUpdate(data.articles)
  }

  const handleDelete = (index) => {
    console.log('handleDelete: before:', data.articles)
    lineUpdate(data.articles.splice(index, 1))
    console.log('handleDelete: after:', data.articles)
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          Détails: {data.articles.length}
          <AddCircleIcon size="small" onClick={handleAddLine} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {data.articles?.map((line, index) => {
          console.log(line)
          return (
            <Grid container spacing={1} key={index} sx={{ marginTop: '5px' }}>
              <Grid item xs={12} sm={12} md={6}>
                <CommonSelect
                  name={`article-${line}`}
                  label="Article"
                  id={`selectArticle-${line}`}
                  data={queryArticles.data}
                  defaultValue
                  value={line.articleId}
                  keyId="id"
                  keyValue="id"
                  keyLabel="_name"
                  onChange={(e) => onChange(e, index)}
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
      </Grid>
    </>
  )
}

export default OrderLines
