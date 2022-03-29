import React from 'react'
import { defaultData } from '../../components/Clients/consts/defaultData'
import ClientForm from '../../components/Clients/ClientForm'
import ModelAdd from '../../components/Model/ModelAdd'

const ClientAdd2 = () => {
  const modelForm = (data) => {
    console.log(data)
    return <ClientForm href="/clients" {...data}></ClientForm>
  }
  return (
    <ModelAdd
      title="Ajouter client"
      model={'clients'}
      defaultData={defaultData}
      modelForm={modelForm}
    />
  )
}

export default ClientAdd2
