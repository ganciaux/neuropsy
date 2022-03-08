import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header/Header'

const ClientEdit = () => {
  const { id } = useParams()
  return (
    <>
      <Header title="Modification client" />
      <ClientForm id={id} />
    </>
  )
}

export default ClientEdit
