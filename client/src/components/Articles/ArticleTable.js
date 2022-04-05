import React, { useEffect, useState } from 'react'
import { Grid, TextField } from '@mui/material'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/articleTableColumns'
import CommonButtonNavigate from '../common/CommonButtonNavigate/CommonButtonNavigate'

export default function ArticleTable({ data = [] }) {
  const [articles, setArticles] = useState(data)
  const articleColumns = columns(articles, setArticles)
  const [filters, setFilters] = useState({
    search: '',
  })
  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const pattern = filters.search.toLowerCase()
    const result = data.filter(
      (article) =>
        article.name.toLowerCase().includes(pattern) ||
        article.label.toLowerCase().includes(pattern) ||
        article.price?.toString().toLowerCase().includes(pattern),
    )
    setArticles(result)
  }, [data, filters])

  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun article" severity="info" />
  }
  return (
    <CommonDataGrid data={articles} columns={articleColumns}>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            name="search"
            placeholder="Recherche dans le nom et le label et le prix"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleOnChange}
          />
        </Grid>
        <Grid xs={12} item>
          <CommonButtonNavigate navigation="/articles/add" />
        </Grid>
      </Grid>
    </CommonDataGrid>
  )
}
