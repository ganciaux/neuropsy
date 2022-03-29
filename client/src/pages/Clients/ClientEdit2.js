import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import ModelEdit from '../../components/Model/ModelEdit'

const ClientEdit2 = () => {
  const modelForm = (data) => {
    console.log(data)
    return <ClientForm href="/clients" {...data}></ClientForm>
  }
  return (
    <ModelEdit title="Gestion client" model={'clients'} modelForm={modelForm} />
  )
}

export default ClientEdit2
