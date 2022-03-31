import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import ModelEdit from '../../components/Model/ModelEdit'

const ClientEdit = () => {
  return (
    <ModelEdit
      title="Gestion client"
      model={'clients'}
      render={(data) => <ClientForm href="/clients" {...data} />}
    />
  )
}

export default ClientEdit
