import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import ModelEdit from '../../components/Model/ModelEdit'

const ClientEdit2 = () => {
  return (
    <ModelEdit
      title="Gestion client"
      model={'clients'}
      modelForm={(data) => <ClientForm href="/clients" {...data} />}
    />
  )
}

export default ClientEdit2
