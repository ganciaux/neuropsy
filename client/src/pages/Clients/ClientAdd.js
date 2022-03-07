import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import Header from '../../components/common/Header/Header'

const ClientAdd = () => {
  return (
    <>
      <Header title="Ajouter un client" />
      <ClientForm />
    </>
  )
}

export default ClientAdd
