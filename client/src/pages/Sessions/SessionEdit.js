import React from 'react'
import SessionForm from '../../components/Sessions/SessionForm'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header/Header'

const SessionEdit = () => {
  const { id } = useParams()
  return (
    <>
      <Header title="Modification du rendez-vous" />
      <SessionForm id={id} />
    </>
  )
}

export default SessionEdit
