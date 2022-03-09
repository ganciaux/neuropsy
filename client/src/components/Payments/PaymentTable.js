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
import { Link, Typography } from '@mui/material'
import { getTypeLabel, getStatusLabel } from './utils/paymentUtils'

export default function PaymentTable({ data, handleDelete }) {
  return (
    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Client</TableCell>
            <TableCell align="right">Montant</TableCell>
            <TableCell>Type</TableCell>
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
              <TableCell align="right">{row.price}</TableCell>
              <TableCell>{getTypeLabel(row.type)}</TableCell>
              <TableCell>{getStatusLabel(row.status)}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Link href={`/payments/edit/${row._id}`} underline="hover">
                  <EditIcon size="small">Modifier</EditIcon>
                </Link>
                <DeleteForeverIcon
                  sx={{ cursor: 'pointer' }}
                  color="error"
                  onClick={(e) => handleDelete(row)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
