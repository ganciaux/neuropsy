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
import { Link, Stack } from '@mui/material'

export default function ArticleTable({ data, handleDelete }) {
  return (
    <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: '#eee' }}>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Label</TableCell>
            <TableCell align="right">Montant</TableCell>
            <TableCell align="right">Rendez-vous</TableCell>
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
                {row.name}
              </TableCell>
              <TableCell>{row.label}</TableCell>
              <TableCell align="right">{row.price.toFixed(2)}€</TableCell>
              <TableCell align="right">{row.sessions}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Stack direction="row" gap={1}>
                  <Link href={`/articles/edit/${row.slug}`} underline="hover">
                    <EditIcon size="small">Modifier</EditIcon>
                  </Link>
                  <DeleteForeverIcon
                    sx={{ cursor: 'pointer' }}
                    color="error"
                    onClick={(e) => handleDelete(row)}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
