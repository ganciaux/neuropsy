import { Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonButtonNavigate from '../common/CommonButtonNavigate/CommonButtonNavigate'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import CommonSelect from '../common/CommonSelect/CommonSelect'
import { sessionStatus } from './consts/sessionStatus'
import { sessionTypes } from './consts/sessionTypes'
import { columns } from './consts/sessionTableColumns'
import CommonDateRange from '../common/CommonDateRange/CommonDateRange'

export default function SessionTable({ data }) {
  const [sessions, setSessions] = useState(data)
  const sessionColumn = columns(sessions, setSessions)
  const [filters, setFilters] = useState({
    search: '',
    status: -1,
    type: -1,
    dates: [null, null],
  })
  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleOnChangeRange = (dates) => {
    setFilters({ ...filters, dates })
  }

  useEffect(() => {
    const pattern = filters.search.toLowerCase()
    const dates = filters.dates[0] != undefined && filters.dates[1] != undefined
    const result = data.filter(
      (session) =>
        session.clientId?._name?.toLowerCase().includes(pattern) &&
        (session.status === filters.status || filters.status === -1) &&
        (session.type === filters.type || filters.type === -1) &&
        (!dates ||
          (dates &&
            new Date(filters.dates[0]).getTime() <=
              new Date(session.date).getTime() &&
            new Date(filters.dates[1]).getTime() >=
              new Date(session.date).getTime())),
    )
    setSessions(result)
  }, [data, filters])

  if (data.length === 0) {
    return <CommonAlert title="" content="Aucun payment" severity="info" />
  }
  return (
    <CommonDataGrid data={sessions} columns={sessionColumn}>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            name="search"
            placeholder="Recherche dans le nom du client"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleOnChange}
          />
        </Grid>
        <Grid xs={6} item>
          <CommonSelect
            name="status"
            label="Statut"
            id="selectStatus"
            data={sessionStatus}
            onChange={handleOnChange}
            value={filters.status}
            defaultValue
            all
          />
        </Grid>
        <Grid xs={6} item>
          <CommonSelect
            name="type"
            label="Type"
            id="selectType"
            data={sessionTypes}
            onChange={handleOnChange}
            value={filters.type}
            defaultValue
            all
          />
        </Grid>
        <Grid item xs={12}>
          <CommonDateRange
            onChange={handleOnChangeRange}
            dates={filters.dates}
            clearDate={() => setFilters({ ...filters, dates: [null, null] })}
          />
        </Grid>
        <Grid xs={12} item>
          <CommonButtonNavigate navigation="/sessions/add" />
        </Grid>
      </Grid>
    </CommonDataGrid>
  )
}
