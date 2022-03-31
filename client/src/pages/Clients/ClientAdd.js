import React from 'react'
import { defaultData } from '../../components/Clients/consts/defaultData'
import ClientForm from '../../components/Clients/ClientForm'
import ModelAdd from '../../components/Model/ModelAdd'

const ClientAdd = () => {
  return (
    <ModelAdd
      title="Ajouter un client"
      model={'clients'}
      defaultData={defaultData}
      render={(data) => <ClientForm href="/clients" {...data} />}
    />
  )
}

export default ClientAdd
