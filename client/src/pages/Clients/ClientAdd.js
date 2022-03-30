import React from 'react'
import { defaultData } from '../../components/Clients/consts/defaultData'
import ClientForm from '../../components/Clients/ClientForm'
import ModelAdd from '../../components/Model/ModelAdd'

const ClientAdd2 = () => {
  return (
    <ModelAdd
      title="Ajouter client"
      model={'clients'}
      defaultData={defaultData}
      modelForm={(data) => <ClientForm href="/clients" {...data} />}
    />
  )
}

export default ClientAdd2
