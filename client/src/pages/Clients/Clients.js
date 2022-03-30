import React from 'react'
import ClientTable from '../../components/Clients/ClientTable'
import ModelList from '../../components/Model/ModelList'

const Clients = () => {
  const render = (data) => {
    return (
      <ClientTable
        isLoading={data.isLoading}
        isSuccess={data.isSuccess}
        data={data.data}
      ></ClientTable>
    )
  }

  return (
    <ModelList
      title="Liste des clients"
      model={'clients'}
      render={(data) => render({ ...data })}
    ></ModelList>
  )
}

export default Clients
