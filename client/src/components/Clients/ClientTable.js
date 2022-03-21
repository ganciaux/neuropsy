import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import { Link } from '@mui/material'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { tableStyle } from '../../styles/tableStyles'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

export default function ClientTable({ data, handleDelete }) {
  const classes = tableStyle()
  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun rendez-vous" severity="info" />
  }
  return (
    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.headers}>
            <TableCell>Nom</TableCell>
            <TableCell>Date de naissance</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Contact</TableCell>
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
                {row._name}
              </TableCell>
              <TableCell>{row._birthdate}</TableCell>
              <TableCell>{row._age}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>
                <Link href={`/clients/edit/${row.slug}`} underline="hover">
                  <EditIcon>Modifier</EditIcon>
                </Link>
                <Link href={`/clients/details/${row.slug}`} underline="hover">
                  <ListAltIcon>Fiche</ListAltIcon>
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
