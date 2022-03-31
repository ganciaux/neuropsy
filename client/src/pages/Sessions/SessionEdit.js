import React from 'react'
import SessionForm from '../../components/Sessions/SessionForm'
import ModelEdit from '../../components/Model/ModelEdit'

const SessionEdit = () => {
  return (
    <ModelEdit
      title="Gestion rendez-vous"
      model={'sessions'}
      render={(data) => <SessionForm href="/sessions" {...data} />}
    />
  )
}

export default SessionEdit
