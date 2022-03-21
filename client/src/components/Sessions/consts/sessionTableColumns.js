import { Link, Stack } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import CommonAlert from '../../common/CommonAlert/CommonAlert'
import {
  getTypeLabel,
  getStatusLabel,
  getStatusSeverity,
} from '..//utils/sessionUtils'

export const columns = (handleDelete) => [
  {
    field: '_date',
    headerName: 'Date',
    minWidth: 90,
    flex: 1,
  },
  {
    field: 'client',
    headerName: 'Client',
    minWidth: 90,
    flex: 2,
    valueGetter: (params) => {
      return params.row.clientId._name
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    type: 'number',
    minWidth: 90,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    valueGetter: (params) => {
      return getTypeLabel(params.row.type)
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    minWidth: 90,
    flex: 1,
    renderCell: (params) => {
      return (
        <CommonAlert
          severity={getStatusSeverity(params.row.status)}
          content={getStatusLabel(params.row.status)}
        />
      )
    },
  },
  {
    field: 'description',
    headerName: 'description',
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
        <Stack direction="row" gap={1}>
          <Link href={`/sessions/edit/${params.row.slug}`} underline="hover">
            <EditIcon>Modifier</EditIcon>
          </Link>
          {handleDelete && (
            <DeleteForeverIcon
              sx={{ cursor: 'pointer' }}
              color="error"
              onClick={(e) => handleDelete(params.row)}
            />
          )}
        </Stack>
      )
    },
  },
]
