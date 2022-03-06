import React from 'react'
import ClientForm from '../../components/Clients/ClientForm'
import { useParams } from 'react-router-dom'

const ClientEdit = () => {
  const { id } = useParams()
  console.log('ClientEdit', id)
  return <ClientForm id={id} />
}

export default ClientEdit
