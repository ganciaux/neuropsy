import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Link } from '@mui/material'
import { getStatusLabel, getStatusSeverity } from './utils/orderUtils'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import axios from 'axios'

export default function OrderTable({ id, data, handleDelete, setError }) {
  const handlePrint = (e) => {
    console.log('handlePrint')
    axios
      .delete(`${process.env.REACT_APP_API_URL}/orders/print/${id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
      })
      .catch((err) => {
        setError({ isError: true, message: err.response.data.message })
      })
  }

  return (
    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Client</TableCell>
            <TableCell align="right">Montant</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._date}
              </TableCell>
              <TableCell>{row.clientId?._name}</TableCell>
              <TableCell align="right">{row.price.toFixed(2)} €</TableCell>
              <TableCell>
                <CommonAlert
                  severity={getStatusSeverity(row.status)}
                  content={getStatusLabel(row.status)}
                />
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Link href={`/orders/edit/${row.slug}`} underline="hover">
                  <EditIcon size="small">Modifier</EditIcon>
                </Link>
                <DeleteForeverIcon
                  sx={{ cursor: 'pointer' }}
                  color="error"
                  onClick={(e) => handleDelete(row)}
                />
                <PictureAsPdfIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={(e) => handlePrint(row)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
