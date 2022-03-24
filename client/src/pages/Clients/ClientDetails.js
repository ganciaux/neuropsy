import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Box } from '@mui/material'
import Header from '../../components/common/Header/Header'
import CommonGrid from '../../components/common/CommonGrid/CommonGrid'
import CommonGridLine from '../../components/common/CommonGrid/CommonGridLine'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import { useFetchData } from '../../utils/useFetchData'
import PaymentTable from '../../components/Payments/PaymentTable'
import SessionTable from '../../components/Sessions/SessionTable'
import OrderTable from '../../components/Orders/OrderTable'
import CommonToggle from '../../components/common/CommonToggle/CommonToggle'
import ClientFormDetails from '../../components/Clients/ClientFormDetails'
import ClientForm2 from '../../components/Clients/ClientForm2'

const ClientDetails = () => {
  const { id } = useParams()
  const [data, setData, isLoading, setIsLoading, error, setError] =
    useFetchData(id, 'clients/details')

  if (error.isError === true) {
    return <Alert severity="error">{error.message}</Alert>
  }

  if (isLoading || !data) {
    return <CommonLoader />
  }

  return (
    <Box>
      <ClientFormDetails client={data} />
      <ClientForm2 client={data} />

      <CommonToggle
        title="Rendez-vous"
        data={data.sessions}
        path={`${id}/session`}
        table={<SessionTable data={data.sessions} name={data.name} />}
      />

      <CommonToggle
        title="Paiments"
        data={data.payments}
        path={`${id}/payment`}
        table={<PaymentTable data={data.payments} name={data.name} />}
      />

      <CommonToggle
        title="Commandes"
        data={data.orders}
        path={`${id}/order`}
        table={<OrderTable data={data.orders} name={data.name} />}
      />
    </Box>
  )
}

export default ClientDetails
