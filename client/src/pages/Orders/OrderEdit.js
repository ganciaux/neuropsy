import React from 'react'
import OrderForm from '../../components/Orders/OrderForm'
import ModelEdit from '../../components/Model/ModelEdit'

const OrderEdit = () => {
  return (
    <ModelEdit
      title="Gestion commande"
      model={'orders'}
      render={(data) => <OrderForm href="/orders" {...data} />}
    />
  )
}

export default OrderEdit
