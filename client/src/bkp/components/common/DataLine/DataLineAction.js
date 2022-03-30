import React from 'react'
import { Link } from '@mui/material'
import CommonButton from '../CommonButton/CommonButton'

const DataLineAction = ({ url, id, label }) => {
  return (
    <>
      <Link href={`${url}/${id}`} underline="hover">
        <CommonButton size="small">{label}</CommonButton>
      </Link>
    </>
  )
}

export default DataLineAction
