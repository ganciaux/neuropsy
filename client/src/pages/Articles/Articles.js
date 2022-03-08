import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import { Button, Link, Typography } from '@mui/material'
import axios from 'axios'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EuroIcon from '@mui/icons-material/Euro'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import Header from '../../components/common/Header/Header'
import DataLineHeader from '../../components/common/DataLine/DataLineHeader'

const Articles = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => {
        setArticles(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  const getContent = (article) => {
    return (
      <>
        <DataLineHeader title={article.name} />
        <DataLineIcon icon={<EuroIcon />} text={article.price.toFixed(2)} />
        <DataLineIcon icon={<CalendarTodayIcon />} text={article.sessions} />
      </>
    )
  }

  const getAction = (id) => {
    return (
      <>
        <Link href={`/articles/details/${id}`} underline="hover">
          <Button size="small">Details</Button>
        </Link>
        <Link href={`/articles/edit/${id}`} underline="hover">
          <Button size="small">Modifier</Button>
        </Link>
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
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
        {articles.map((article) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={article.id}>
              <BasicCard
                header=""
                content={getContent(article)}
                actions={getAction(article.slug)}
              ></BasicCard>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Articles
