import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { InputAdornment, Stack, TextField, Typography } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import CommonSelectData from '../common/CommonSelect/CommonSelectData'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from 'axios'
import CommonSelect from '../common/CommonSelect/CommonSelect'

const OrderLines = ({ lines, handleOnChange, setIsLoading }) => {
  const [data, setData] = React.useState(lines)
  const [articles, setArticles] = React.useState([])
  const [articlesSelect, setArticeSelect] = React.useState([])

  const handleAddLine = (e) => {
    data.push({
      articleId: '-1',
      description: 'line 1',
      quantity: 1,
      unitCost: 0,
      price: 0,
    })
    setData(data)
    handleOnChange(data)
  }

  const onChange = (e, index) => {
    data[index] = {
      ...data[index],
      [e.target.name]: e.target.value,
    }
    setData(data)
    handleOnChange(data)
  }

  const onChangeArticle = (e, index) => {
    data[index] = {
      ...data[index],
      [e.target.name]: e.target.value,
    }
    const article = articles.filter((article) => article.id === e.target.value)
    if (article) {
      data[index] = {
        ...data[index],
        price: article.price * data[index].quantity,
        unitCost: article.price,
      }
    }
    setData(data)
    handleOnChange(data)
  }

  const handleDelete = (index) => {
    console.log('delete...', data.splice(index, 1))
    setData(data)
    handleOnChange(data)
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
          Détails:
          <AddCircleIcon size="small" onClick={handleAddLine} />
        </Typography>
      </Grid>
      {data?.map((line, index) => {
        return (
          <Grid container spacing={1} key={index} sx={{ marginTop: '5px' }}>
            <Grid item xs={12} sm={12} md={7}>
              <CommonSelect
                id="article"
                label="Article"
                name="articleId"
                value={line.articleId}
                data={articlesSelect}
                onChange={(e) => onChangeArticle(e, index)}
                setIsLoading={setIsLoading}
                placeHolder="<Choisir un article>"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={2}>
              <TextField
                name={`quantity`}
                label="Quantité"
                value={line.quantity}
                placeholder="Montant"
                variant="outlined"
                fullWidth
                sx={{ textAlign: 'right' }}
                onChange={(e) => onChange(e, index)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Stack direction="row" alignItems="center" gap={1}>
                <TextField
                  name={`unitCost`}
                  label="Montant"
                  value={line.unitCost}
                  placeholder="Montant"
                  variant="outlined"
                  fullWidth
                  sx={{ textAlign: 'right' }}
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
