import { Link } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import EditIcon from '@mui/icons-material/Edit'

export const columns = [
  {
    field: 'name',
    headerName: 'Nom',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'firstname',
    headerName: 'Prénom',
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
