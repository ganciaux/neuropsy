import React from 'react'
import { defaultData } from '../../components/Orders/consts/defaultData'
import OrderForm from '../../components/Orders/OrderForm'
import ModelAdd from '../../components/Model/ModelAdd'

const OrderAdd = () => {
  return (
    <ModelAdd
      title="Ajouter une commande"
      model={'orders'}
      defaultData={defaultData}
      render={(data) => <OrderForm href="/orders" {...data} />}
    />
  )
}

export default OrderAdd
