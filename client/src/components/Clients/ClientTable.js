import * as React from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonLoader from '../common/CommonLoader/CommonLoader'
import { tableStyle } from '../../styles/tableStyles'

import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid'
import { columns } from './consts/clientTableColumns'
export default function ClientTable({ data }) {
  const classes = tableStyle()

  if (!data) {
    return <CommonLoader />
  }
  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun client" severity="info" />
  }
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={columns}
        rowsPerPageOptions={[10, 50, 100]}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        sx={{
          '.MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-root': {
            border: '1px solid #efefef',
            borderRadius: '5px',
            marginTop: '20px',
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within ': {
            outline: 'none !important',
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
            backgroundColor: '#efefef',
            fontSize: '20px',
            backgroundColor: '#efefef',
            outline: 'none',
          },
        }}
      />
    </div>
  )
}
