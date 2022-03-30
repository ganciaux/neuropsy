import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Header from '../../components/common/Header/Header'
import ArticleTable from '../../components/Articles/ArticleTable'
import CommonDialog from '../../components/common/CommonDialog/CommonDialog'
const Articles = () => {
  const [articles, setArticles] = useState([])
  const [articlesFiltered, setArticlesFiltered] = useState([])
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState({})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => {
        setArticles(res.data.data)
        setArticlesFiltered(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  const handleCloseOk = () => {
    setOpen(false)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/articles/${data._id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
        const newArticles = articlesFiltered.filter((article) => {
          return article._id !== data._id
        })
        setArticlesFiltered(newArticles)
      })
      .catch((err) => {
        setError({ isError: true, message: err.response.data.message })
      })
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  const handleDelete = (row) => {
    setOpen(true)
    setData(row)
  }

  const handleFilter = (e) => {
    const pattern = e.target.value.toLowerCase()
    const result = articles.filter((article) => {
      return (
        article.name?.toLowerCase().includes(pattern) ||
        article.label?.toLowerCase().includes(pattern) ||
        article.price.toString().toLowerCase().includes(pattern)
      )
    })
    setArticlesFiltered(result)
  }

  const getContent = () => {
    return (
      <>
        <div>Nom: {data.name}</div>
        <div>Label: {data.label}</div>
        <div>Montant: {data.price}€</div>
      </>
    )
  }

  return (
    <Box>
      <Header
        title="Liste des articles"
        href="/articles/add"
        action="Ajouter"
      />
      {articles.length === 0 && <Typography>Aucun article</Typography>}
      {articles.length > 0 && (
        <>
          <TextField
            name="search"
            placeholder="Recherche dans le nom le label et le prix"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleFilter}
          />
          <ArticleTable data={articlesFiltered} handleDelete={handleDelete} />
          <CommonDialog
            title="Supprimer l'article ?"
            open={open}
            content={getContent}
            handleCloseOk={handleCloseOk}
            handleCloseCancel={handleCloseCancel}
          />
        </>
      )}
    </Box>
  )
}

export default Articles
