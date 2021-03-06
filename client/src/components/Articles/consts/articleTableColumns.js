import CommonDataGridRowAction from '../../common/CommonDataGridRowAction/CommonDataGridRowAction'

export const columns = (data, setData) => [
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
          editHref={`/articles/edit/${params.row.slug}`}
          deleteHref="/articles"
          dialogTitle="Supprimer l'article ?"
          dialogContent="todo..."
          id={params.row._id}
          data={data}
          setData={setData}
        />
      )
    },
  },
]
