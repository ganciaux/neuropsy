import CommonAlert from '../../common/CommonAlert/CommonAlert'
import {
  getTypeLabel,
  getStatusLabel,
  getStatusSeverity,
} from '../utils/sessionUtils'
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
      return params.row.clientId._name
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    minWidth: 90,
    flex: 1,
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
        <CommonDataGridRowAction
          editHref={`/sessions/edit/${params.row.slug}`}
          deleteHref="/sessions"
          dialogTitle="Supprimer le rendez-vous ?"
          dialogContent="todo..."
          id={params.row._id}
          data={data}
          setData={setData}
        />
      )
    },
  },
]
