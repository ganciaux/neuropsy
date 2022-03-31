import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid'
import { Button, TextField } from '@mui/material'
const CommonDataGrid = ({
  height = 500,
  width = '100%',
  data,
  columns,
  pages = [10, 50, 100],
  handleFilter,
  href,
  hrefContent = 'Ajouter',
  placeholder = '',
  label = 'Filtre de recherche',
  children,
}) => {
  const [dataFiltered, setDataFiltered] = useState([])

  useEffect(() => {
    setDataFiltered(data)
  }, [data])

  return (
    <>
      {children}
      {handleFilter && (
        <>
          <TextField
            name="search"
            placeholder={placeholder}
            label={label}
            variant="outlined"
            fullWidth
            onChange={(e) => handleFilter(e, data, setDataFiltered)}
          />
          {href && (
            <Button
              sx={{ marginTop: '10px' }}
              type="button"
              variant="contained"
              color="primary"
              href={href}
            >
              {hrefContent}
            </Button>
          )}
        </>
      )}
      <div style={{ height: height, width: width }}>
        <DataGrid
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          rows={dataFiltered}
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
    </>
  )
}

export default CommonDataGrid
