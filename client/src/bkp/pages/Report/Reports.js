import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { TextField, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Header from '../../components/common/Header/Header'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import DataLineAction from '../../components/common/DataLine/DataLineAction'
import DataLineHeader from '../../components/common/DataLine/DataLineHeader'
import {
  getTypeLabel,
  getStatusLabel,
  getStatusSeverity,
} from '../../components/Sessions/utils/sessionUtils'
import CommonDateRange from '../../components/common/CommonDateRange/CommonDateRange'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import SessionTable from '../../components/Sessions/SessionTable'
import CommonDialog from '../../components/common/CommonDialog/CommonDialog'

const Reports = () => {
  const [sessions, setSessions] = useState([])
  const [data, setData] = useState({})
  const [dates, setDates] = useState([null, null])
  const [sessionsFiltered, setSessionsFiltered] = useState([])
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState(true)

  const handleSearch = (e) => {
    setSearch(true)
  }

  const handleOnChangeRange = (dates) => {
    console.log('handleOnChangeRange')
    setDates(dates)
  }

  useEffect(() => {
    let options = ''
    if (search === true) {
      if (dates[0] != undefined && dates[1] != undefined) {
        options += `&date[gte]=${new Date(dates[0]).getTime()}`
        options += `&date[lte]=${new Date(dates[1]).getTime()}`
      }
      axios
        .get(`${process.env.REACT_APP_API_URL}/sessions?sort=-date${options}`)
        .then((res) => {
          setSessions(res.data.data)
          setSessionsFiltered(res.data.data)
          setSearch(false)
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  }, [search])

  const handleFilter = (e) => {
    console.log(data)
    const pattern = e.target.value.toLowerCase()
    const result = sessions.filter((session) => {
      console.log(session)
      return session.clientId?._name?.toLowerCase().includes(pattern)
    })
    setSessionsFiltered(result)
  }

  const handleCloseOk = () => {
    setOpen(false)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/session/${data._id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
        const newSessions = sessionsFiltered.filter((session) => {
          return session._id !== session._id
        })
        setSessionsFiltered(newSessions)
      })
      .catch((err) => {
        setError({ isError: true, message: err.response.data.message })
      })
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  const handleDelete = (row) => {
    console.log('delete')
    setOpen(true)
    setData(row)
  }

  const getContentSession = () => {
    return (
      <>
        <div>Date: {data._date}</div>
        <div>Nom: {data.clientId?._name}</div>
      </>
    )
  }

  return (
    <Box>
      <Header title="Rapport" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CommonDateRange onChange={handleOnChangeRange} dates={dates} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Chercher
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
        <Grid item xs={12}>
          {sessionsFiltered.length === 0 && (
            <Typography>Aucun rendez-vous</Typography>
          )}
          {sessionsFiltered.length > 0 && (
            <>
              <SessionTable
                data={sessionsFiltered}
                handleDelete={handleDelete}
              />
            </>
          )}
          {/*
        {sessionsFiltered.map((session) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={session.id}>
              <BasicCard
                header=""
                content={getContent(session)}
                actions={getAction(session.slug)}
              ></BasicCard>
            </Grid>
          )
        })
          }
        */}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Reports
