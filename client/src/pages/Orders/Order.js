import React from 'react'
import OrderForm from '../../components/Orders/OrderForm'
import Header from '../../components/common/Header/Header'
import { useParams } from 'react-router-dom'
import { useFetchData } from '../../utils/useFetchData '
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'

const OrderAdd = () => {
  const { id, idClient } = useParams()
  const [client, isLoadingOrder, errorOrder] = useFetchData(id, 'orders')
  const [order, isLoadingClient, errorClients] = useFetchData(
    idClient,
    'clients',
  )

  if (isLoadingOrder || isLoadingClient) {
    return <CommonLoader />
  }

  return (
    <>
      <Header title="Ajouter une commande" />
      <OrderForm client={client} order={order} />
    </>
  )
}

export default OrderAdd
