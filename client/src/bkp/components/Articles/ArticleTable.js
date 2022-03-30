import * as React from 'react'
import { tableStyle } from '../../styles/tableStyles'
import { columns } from './consts/articleTableColumns'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid'

export default function ArticleTable({ data, handleDelete }) {
  const classes = tableStyle()
  const articleColumn = columns(handleDelete)
  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun article" severity="info" />
  }
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={articleColumn}
        rowsPerPageOptions={[10, 50, 100]}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  )
}
