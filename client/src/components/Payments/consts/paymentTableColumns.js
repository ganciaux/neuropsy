import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CommonAlert from '../../common/CommonAlert/CommonAlert'
import {
  getTypeLabel,
  getTypeIcon,
  getStatusLabel,
  getStatusSeverity,
} from '../utils/paymentUtils'
import CommonDataGridRowAction from '../../common/CommonDataGridRowAction/CommonDataGridRowAction'

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
      return params.row.clientId?._name
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
        <CommonDataGridRowAction
          editHref={`/payments/edit/${params.row.slug}`}
          deleteHref="/payments"
          dialogTitle="Supprimer le paiement ?"
          dialogContent={`${params.row._date} - ${
            params.row.clientId?._name
          } - ${params.row.price?.toFixed(2)} €`}
          id={params.row._id}
          data={data}
          setData={setData}
        />
      )
    },
  },
]
