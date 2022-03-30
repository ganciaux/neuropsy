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
import { Alert, Link, Typography } from '@mui/material'
import { getStatusLabel, getStatusSeverity } from './utils/orderUtils'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { tableStyle } from '../../styles/tableStyles'

export default function OrderTable({ data, handleDelete, handlePrint, name }) {
  const classes = tableStyle()

  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucune commande" severity="info" />
  }
  return (
    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.headers}>
            <TableCell>Date</TableCell>
            {!name && <TableCell>Client</TableCell>}
            <TableCell align="right">Montant</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Réference</TableCell>
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
              {!name && <TableCell>{row.clientId?._name}</TableCell>}
              <TableCell align="right">{row.price.toFixed(2)}€</TableCell>
              <TableCell>
                <CommonAlert
                  severity={getStatusSeverity(row.status)}
                  content={getStatusLabel(row.status)}
                />
              </TableCell>
              <TableCell>{row.ref}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Link href={`/orders/edit/${row.slug}`} underline="hover">
                  <EditIcon size="small">Modifier</EditIcon>
                </Link>
                {handlePrint && (
                  <PictureAsPdfIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => handlePrint(row)}
                  />
                )}
                {handleDelete && (
                  <DeleteForeverIcon
                    sx={{ cursor: 'pointer' }}
                    color="error"
                    onClick={(e) => handleDelete(row)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
