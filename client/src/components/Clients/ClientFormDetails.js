import React from 'react'
import CommonGrid from '../common/CommonGrid/CommonGrid'
import CommonGridLine from '../common/CommonGrid/CommonGridLine'

const ClientFormDetails = ({ client }) => {
  return (
    <>
      <CommonGrid title="Fiche client" path={`/clients/edit/${client.slug}`}>
        <CommonGridLine label="Nom" value={client.name} />
        <CommonGridLine label="Prénom" value={client.firstname} />
        <CommonGridLine label="Email" value={client.email} />
        <CommonGridLine label="Téléphone" value={client.phone} />
        <CommonGridLine label="Ville" value={client.city} />
        <CommonGridLine label="Code postal" value={client.zip} />
        <CommonGridLine label="Adresse" value={client.address} />
        <CommonGridLine label="Date de naissance" value={client._birthdate} />
        <CommonGridLine label="Age" value={client._age} />
        <CommonGridLine label="Description" value={client.description} />
      </CommonGrid>
    </>
  )
}

export default ClientFormDetails
