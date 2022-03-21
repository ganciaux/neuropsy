import { Link, Stack } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

export const columns = (handleDelete) => [
  {
    field: 'name',
    headerName: 'Nom',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'label',
    headerName: 'label',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Montant',
    type: 'number',
    minWidth: 90,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
  },
  {
    field: 'sessions',
    headerName: 'Rendez-vous',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Action',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Stack direction="row" gap={1}>
            <Link href={`/articles/edit/${params.row.slug}`} underline="hover">
              <EditIcon size="small">Modifier</EditIcon>
            </Link>
            <DeleteForeverIcon
              sx={{ cursor: 'pointer' }}
              color="error"
              onClick={(e) => handleDelete(params.row)}
            />
          </Stack>
        </>
      )
    },
  },
]
