import React, { useState } from 'react'
import CommonAlert from '../common/CommonAlert/CommonAlert'
import CommonDataGrid from '../common/CommonDataGrid/CommonDataGrid'
import { columns } from './consts/sessionTableColumns'

export default function SessionTable({ data }) {
  const [sessions, setSessions] = useState(data)
  const sessionColumn = columns(sessions, setSessions)
  const length = data ? data.length : 0

  const handleFilter = (e, data, setFilter) => {
    const pattern = e.target.value.toLowerCase()
    const result = data.filter(
      (session) =>
        session.name.toLowerCase().includes(pattern) ||
        session.label.toLowerCase().includes(pattern),
    )
    setFilter(result)
  }

  if (length === 0) {
    return <CommonAlert title="" content="Aucun rendez-vous" severity="info" />
  }
  return (
    <CommonDataGrid
      data={sessions}
      columns={sessionColumn}
      model="sessions"
      handleFilter={handleFilter}
      href="/sessions/add"
      placeholder="Recherche dans le nom"
    />
  )
}
