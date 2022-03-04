import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { cardStyles } from './styles'

const BasicCard = ({ header, content, actions }) => {
  return (
    <Card>
      {header}
      <CardContent>{content}</CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  )
}

export default BasicCard
