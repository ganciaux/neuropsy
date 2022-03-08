import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import axios from 'axios'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import Header from '../../components/common/Header/Header'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import DataLineAction from '../../components/common/DataLine/DataLineAction'
import DataLineHeader from '../../components/common/DataLine/DataLineHeader'

const Sessions = () => {
  const [sessions, setSessions] = useState([])
  const [sessionsFiltered, setSessionsFiltered] = useState([])

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
    const pattern = e.target.value.toLowerCase()
    const result = sessions.filter((session) =>
      session.clientId?._name?.toLowerCase().includes(pattern),
    )
    setSessionsFiltered(result)
  }

  const getContent = (session) => {
    return (
      <>
        <DataLineHeader title={`${session._date}`} />
        <DataLineIcon
          icon={<AssignmentIndIcon />}
          text={`${session.clientId._name}`}
        />
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
      <TextField
        name="search"
        placeholder="Recherche dans le nom, le prénom et l'email"
        label="Filtre de recherche"
        variant="outlined"
        fullWidth
        onChange={handleFilter}
      />
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
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
        })}
      </Grid>
    </Box>
  )
}

export default Sessions
