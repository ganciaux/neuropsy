import React from 'react'
import OrderForm from '../../components/Orders/OrderForm'
import Header from '../../components/common/Header/Header'
import { useParams } from 'react-router-dom'
import { useFetchData } from '../../utils/useFetchData'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'

const OrderAdd = () => {
  const { idClient } = useParams()
  const [data, isLoading, error] = useFetchData(idClient, 'clients')

  if (isLoading) {
    return <CommonLoader />
  }

  return (
    <>
      <Header title="Ajouter une commande" />
      <OrderForm client={data} />
    </>
  )
}

export default OrderAdd
