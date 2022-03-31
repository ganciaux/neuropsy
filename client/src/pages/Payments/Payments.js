import React from 'react'
import PaymentTable from '../../components/Payments/PaymentTable'
import ModelList from '../../components/Model/ModelList'

const Payments = () => {
  return (
    <ModelList
      title="Liste des paiements"
      model={'payments'}
      render={(data) => <PaymentTable data={data.data} />}
    ></ModelList>
  )
}

export default Payments
