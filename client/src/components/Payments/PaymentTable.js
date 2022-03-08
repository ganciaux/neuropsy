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
import { Link } from '@mui/material'
import axios from 'axios'

export default function PaymentTable({ data }) {
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [payments, setPayments] = React.useState(data)

  console.log(payments, data)

  const handleDelete = (row) => {
    console.log(row)
    axios
      .delete(`http://localhost:5001/api/payments/${row._id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
        const newPayments = payments.filter((item) => payments.id !== row._id)
        setPayments(newPayments)
      })
      .catch((err) => {
        setError({ isError: true, message: err.response.data.message })
      })
  }

  return (
    <TableContainer component={Paper}>
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
          {payments.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.clientId?._name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.status}</TableCell>
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
