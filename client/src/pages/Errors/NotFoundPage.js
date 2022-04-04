import { Grid } from '@mui/material'
import React from 'react'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import Header from '../../components/Header/Header'

const NotFoundPage = () => {
  return (
    <Grid container>
      <Header />
      <CommonPageHeader title="NotFoundPage" />
    </Grid>
  )
}

export default NotFoundPage
