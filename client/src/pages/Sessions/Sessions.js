import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import axios from 'axios'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ListAltIcon from '@mui/icons-material/ListAlt'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import Header from '../../components/common/Header/Header'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import DataLineAction from '../../components/common/DataLine/DataLineAction'
import DataLineHeader from '../../components/common/DataLine/DataLineHeader'
import {
  getTypeLabel,
  getStatusLabel,
  getStatusSeverity,
} from '../../components/Sessions/utils/sessionUtils'
import CommontDatePicker from '../../components/common/CommonDatePicker/CommontDatePicker'
import CommonDateRange from '../../components/common/CommonDateRange/CommonDateRange'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'
import SessionTable from '../../components/Sessions/SessionTable'
import CommonDialog from '../../components/common/CommonDialog/CommonDialog'

const Sessions = () => {
  const [sessions, setSessions] = useState([])
  const [data, setData] = useState({})
  const [dates, setDates] = useState([null, null])
  const [sessionsFiltered, setSessionsFiltered] = useState([])
  const [error, setError] = React.useState({ isError: false, message: '' })
  const [open, setOpen] = React.useState(false)

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleOnChangeRange = (dates) => {
    setDates(dates)
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sessions?sort=-date`)
      .then((res) => {
        setSessions(res.data.data)
        setSessionsFiltered(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  const handleFilter = (e) => {
    console.log(data)
    const pattern = e.target.value.toLowerCase()
    const result = sessions.filter((session) =>
      session.clientId?._name?.toLowerCase().includes(pattern),
    )
    setSessionsFiltered(result)
  }

  const handleCloseOk = () => {
    setOpen(false)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/session/${data._id}`)
      .then((res) => {
        setError({ isSuccess: true, isError: false, message: 'Success' })
        const newPayments = sessionsFiltered.filter((payment) => {
          return payment._id !== data._id
        })
        setSessionsFiltered(newPayments)
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

  const getContent = (session) => {
    const status = (
      <CommonAlert
        severity={getStatusSeverity(session.status)}
        content={getStatusLabel(session.status)}
      />
    )

    return (
      <>
        <DataLineHeader title={`${session._date}`} />
        <DataLineIcon
          icon={<AssignmentIndIcon />}
          text={`${session.clientId?._name}`}
        />
        <DataLineIcon
          icon={<ListAltIcon />}
          text={getTypeLabel(session.type)}
        />
        <DataLineIcon text={status} />
      </>
    )
  }

  const getAction = (id) => {
    return (
      <>
        <DataLineAction url="/sessions/edit" id={id} label="Modifier" />
      </>
    )
  }

  return (
    <Box>
      <Header
        title="Liste des rendez-vous"
        href="/sessions/add"
        action="Ajouter"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="search"
            placeholder="Recherche dans le nom, le prénom et l'email"
            label="Filtre de recherche"
            variant="outlined"
            fullWidth
            onChange={handleFilter}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CommonDateRange onChange={handleOnChangeRange} dates={dates} />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
        {sessionsFiltered.length === 0 && (
          <Typography>Aucun rendez-vous</Typography>
        )}
        {sessionsFiltered.length > 0 && (
          <>
            <SessionTable data={sessionsFiltered} handleDelete={handleDelete} />
            <CommonDialog
              title="Supprimer le rendez-vous ?"
              open={open}
              content={getContentSession}
              handleCloseOk={handleCloseOk}
              handleCloseCancel={handleCloseCancel}
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
    </Box>
  )
}

export default Sessions
