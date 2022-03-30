import { Typography, Link } from '@mui/material'
import React from 'react'
import CommonButton from '../CommonButton/CommonButton'

const Header = ({ title, href, action }) => {
  const isAction = href && action ? true : false
  return (
    <Typography variant="h4" gutterBottom component="div">
      {title}
      {isAction && (
        <Link sx={{ marginLeft: '10px' }} href={href} underline="hover">
          <CommonButton variant="contained">{action}</CommonButton>
        </Link>
      )}
    </Typography>
  )
}

export default Header
