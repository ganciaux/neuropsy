import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const CommonButtonNavigate = ({
  children,
  sx = { marginTop: '10px' },
  type = 'button',
  variant = 'contained',
  color = 'primary',
  label = 'Ajouter',
  navigation = '/',
}) => {
  const navigate = useNavigate()
  return (
    <Button
      sx={sx}
      type={type}
      variant={variant}
      color={color}
      onClick={() => navigate(navigation)}
    >
      {label}
    </Button>
  )
}

export default CommonButtonNavigate
