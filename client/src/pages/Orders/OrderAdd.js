import React from 'react'
import OrderForm from '../../components/Orders/OrderForm'
import Header from '../../components/common/Header/Header'

const OrderAdd = () => {
  return (
    <>
      <Header title="Ajouter une commande" />
      <OrderForm />
    </>
  )
}

export default OrderAdd
