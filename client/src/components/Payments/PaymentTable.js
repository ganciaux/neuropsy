import * as React from 'react'
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { tableStyle } from '../../styles/tableStyles'
import { columns } from './consts/paymentTableColumns'

export default function PaymentTable({ data, handleDelete, name }) {
  const classes = tableStyle()
  const paymentColumnDefault = columns(name, handleDelete)

  const paymentColumn = paymentColumnDefault.filter((session) => {
    if (!name) return true
    else return session.field !== 'client'
  })

  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun paiemenet" severity="info" />
  }
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={paymentColumn}
        rowsPerPageOptions={[10, 50, 100]}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  )
}
