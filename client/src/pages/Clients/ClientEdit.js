import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header/Header'

const ClientEdit = () => {
  const { id } = useParams()
  console.log('ClientEdit', id)
  return (
    <>
      <Header title="Modification client" />
      <ClientForm id={id} />
    </>
  )
}

export default ClientEdit
