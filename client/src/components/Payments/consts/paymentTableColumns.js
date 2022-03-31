import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import CommonAlert from '../../common/CommonAlert/CommonAlert'
import {
  getTypeLabel,
  getTypeIcon,
  getStatusLabel,
  getStatusSeverity,
} from '../utils/paymentUtils'
import { CommonDialogDelete } from '../../common/CommonDialogDelete/CommonDialogDelete'

export const columns = (data, setData) => [
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
    field: 'price',
    headerName: 'Montant',
    minWidth: 90,
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    valueGetter: (params) => {
      return `${params.row.price?.toFixed(2)} €`
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    minWidth: 90,
    flex: 2,
    renderCell: (params) => {
      return (
        <ListItem>
          <ListItemIcon>{getTypeIcon(params.row.type)}</ListItemIcon>
          <ListItemText primary={getTypeLabel(params.row.type)} />
        </ListItem>
      )
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
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
    field: 'action',
    headerName: 'Action',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Stack direction="row" gap={1}>
            <Link href={`/payments/edit/${params.row.slug}`} underline="hover">
              <EditIcon size="small">Modifier</EditIcon>
            </Link>
            <DeleteForeverIcon
              sx={{ cursor: 'pointer' }}
              color="error"
              onClick={(e) => console.log('delete')}
            />
            <CommonDialogDelete
              title="Supprimer le paiment ?"
              path="/payments"
              row={params.row}
              data={data}
              setData={setData}
            />
          </Stack>
        </>
      )
    },
  },
]
