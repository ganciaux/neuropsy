import { Link } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

export const columns = [
  {
    field: 'firstname',
    headerName: 'First name',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Last name',
    minWidth: 90,
    flex: 1,
  },
  {
    field: '_age',
    headerName: 'Age',
    type: 'number',
    minWidth: 90,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: '_name',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    minWidth: 90,
    flex: 2,
    valueGetter: (params) =>
      `${params.row.firstname || ''} ${params.row.name || ''}`,
  },
  {
    field: 'action',
    headerName: 'Action',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link href={`/clients/edit/${params.row.slug}`} underline="hover">
            <EditIcon>Modifier</EditIcon>
          </Link>
          <Link href={`/clients/details/${params.row.slug}`} underline="hover">
            <ListAltIcon>Fiche</ListAltIcon>
          </Link>
        </>
      )
    },
  },
]
