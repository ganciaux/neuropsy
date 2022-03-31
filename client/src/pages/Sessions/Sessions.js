import React from 'react'
import SessionTable from '../../components/Sessions/SessionTable'
import ModelList from '../../components/Model/ModelList'

const Sessions = () => {
  return (
    <ModelList
      title="Liste des rendez-vous"
      model={'sessions'}
      render={(data) => <SessionTable data={data.data} />}
    ></ModelList>
  )
}

export default Sessions
