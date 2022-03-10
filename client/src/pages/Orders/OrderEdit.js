import React from 'react'
import OrderForm from '../../components/Orders/OrderForm'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header/Header'

const OrderEdit = () => {
  const { id } = useParams()
  return (
    <>
      <Header title="Modification de la commande" />
      <OrderForm id={id} />
    </>
  )
}

export default OrderEdit
