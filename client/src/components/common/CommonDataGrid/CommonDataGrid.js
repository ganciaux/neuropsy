import React from 'react'
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid'
const CommonDataGrid = ({
  height = 500,
  width = '100%',
  data,
  columns,
  pages = [10, 50, 100],
}) => {
  return (
    <div style={{ height: height, width: width }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={columns}
        rowsPerPageOptions={pages}
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

export default CommonDataGrid
