import { Chip, IconButton, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const CommonToggle = ({ title, data, path, table }) => {
  const [toggle, setToggle] = useState(false)
  const handleToggle = (e) => {
    setToggle(!toggle)
  }
  const handleAdd = (e) => {}

  return (
    <Typography variant="h6" component="div" sx={{ paddingTop: '10px' }}>
      <Chip
        label={data.length}
        color="primary"
        sx={{ marginRight: '5px' }}
      ></Chip>
      {title}:
      <IconButton href={path} aria-label="afficher" color="primary">
        <AddCircleIcon />
      </IconButton>
      {data.length > 0 && (
        <>
          {toggle && (
            <IconButton
              onClick={handleToggle}
              aria-label="afficher"
              color="primary"
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          )}
          {!toggle && (
            <IconButton
              onClick={handleToggle}
              aria-label="afficher"
              color="primary"
              fontSize="small"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          )}
          {toggle && <Paper elevation={3}>{table}</Paper>}
        </>
      )}
    </Typography>
  )
}

export default CommonToggle
