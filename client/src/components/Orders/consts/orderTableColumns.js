import CommonAlert from '../../common/CommonAlert/CommonAlert'
import { getStatusLabel, getStatusSeverity } from '../utils/orderUtils'
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
          editHref={`/orders/edit/${params.row.slug}`}
          deleteHref="/orders"
          printHref="/orders/print"
          dialogTitle="Supprimer la commande ?"
          dialogContent="todo..."
          id={params.row._id}
          data={data}
          setData={setData}
        />
      )
    },
  },
]
