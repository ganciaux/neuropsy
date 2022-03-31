import React from 'react'
import ClientTable from '../../components/Clients/ClientTable'
import ModelList from '../../components/Model/ModelList'

const Clients = () => {
  return (
    <ModelList
      title="Liste des clients"
      model={'clients'}
      render={(data) => <ClientTable data={data.data} />}
    ></ModelList>
  )
}

export default Clients
