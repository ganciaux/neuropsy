import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import Header from '../../components/common/Header/Header'
import CommonGrid from '../../components/common/CommonGrid/CommonGrid'
import CommonGridLine from '../../components/common/CommonGrid/CommonGridLine'

const ArticleDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState({})

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/articles/${id}`)
      .then((res) => {
        setIsLoading(false)
        setData(res.data.data)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err.response.data)
      })
  }, [id])

  return (
    <Box>
      <Header title="Détails article" />
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <CommonGrid title="Fiche article">
          <CommonGridLine label="Nom" value={data.name} />
          <CommonGridLine label="Label" value={data.label} />
          <CommonGridLine label="Prix" value={`${data.price?.toFixed(2)}€`} />
          <CommonGridLine label="Nombre de sessions" value={data.sessions} />
          <CommonGridLine label="Description" value={data.name} />
        </CommonGrid>
      )}
    </Box>
  )
}

export default ArticleDetails
