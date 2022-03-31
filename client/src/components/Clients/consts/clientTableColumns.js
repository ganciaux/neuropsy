import CommonDataGridRowAction from '../../common/CommonDataGridRowAction/CommonDataGridRowAction'

export const columns = (data, setData) => [
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
        <CommonDataGridRowAction
          detailsHref={`/clients/details/${params.row.slug}`}
          editHref={`/clients/edit/${params.row.slug}`}
          deleteHref="/clients"
          dialogTitle="Supprimer le clients ?"
          dialogContent="todo..."
          id={params.row._id}
          data={data}
          setData={setData}
        />
      )
    },
  },
]
