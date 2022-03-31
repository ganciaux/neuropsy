import React from 'react'
import OrderTable from '../../components/Orders/OrderTable'
import ModelList from '../../components/Model/ModelList'

const Orders = () => {
  return (
    <ModelList
      title="Liste des commandes"
      model={'orders'}
      render={(data) => <OrderTable data={data.data} />}
    ></ModelList>
  )
}

export default Orders
