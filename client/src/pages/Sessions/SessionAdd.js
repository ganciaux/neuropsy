import React from 'react'
import { defaultData } from '../../components/Sessions/consts/defaultData'
import SessionForm from '../../components/Sessions/SessionForm'
import ModelAdd from '../../components/Model/ModelAdd'

const SessionAdd = () => {
  return (
    <ModelAdd
      title="Ajouter un rendez-vous"
      model={'sessions'}
      defaultData={defaultData}
      render={(data) => <SessionForm href="/sessions" {...data} />}
    />
  )
}

export default SessionAdd
