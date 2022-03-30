import * as React from 'react'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { columns } from './consts/sessionTableColumns'
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid'
import { tableStyle } from '../../styles/tableStyles'
import CommonAlert from '../common/CommonAlert/CommonAlert'

export default function SessionTable({ data, name, handleDelete }) {
  const classes = tableStyle()
  const sessionColumnDefault = columns(name, handleDelete)

  const sessionColumn = sessionColumnDefault.filter((session) => {
    if (!name) return true
    else return session.field !== 'client'
  })

  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun rendez-vous" severity="info" />
  }
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={sessionColumn}
        rowsPerPageOptions={[10, 50, 100]}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  )
}
