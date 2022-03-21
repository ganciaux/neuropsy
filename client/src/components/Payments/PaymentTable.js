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
import {
  Alert,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  getTypeLabel,
  getTypeIcon,
  getStatusLabel,
  getStatusSeverity,
} from './utils/paymentUtils'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { tableStyle } from '../../styles/tableStyles'

export default function PaymentTable({ data, handleDelete, name }) {
  const classes = tableStyle()

  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun paiement" severity="info" />
  }
  return (
    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.headers}>
            <TableCell>Date</TableCell>
            {!name && <TableCell>Client</TableCell>}
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
              {!name && <TableCell>{row.clientId?._name}</TableCell>}
              <TableCell align="right">{row.price?.toFixed(2)}€</TableCell>
              <TableCell>
                <ListItem>
                  <ListItemIcon>{getTypeIcon(row.type)}</ListItemIcon>
                  <ListItemText primary={getTypeLabel(row.type)} />
                </ListItem>
              </TableCell>
              <TableCell>
                <CommonAlert
                  severity={getStatusSeverity(row.status)}
                  content={getStatusLabel(row.status)}
                />
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Link href={`/payments/edit/${row.slug}`} underline="hover">
                  <EditIcon size="small">Modifier</EditIcon>
                </Link>
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
