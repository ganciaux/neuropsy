import React from 'react'
import { defaultData } from '../../components/Payments/consts/defaultData'
import PaymentForm from '../../components/Payments/PaymentForm'
import ModelAdd from '../../components/Model/ModelAdd'

const PaymentAdd = () => {
  return (
    <ModelAdd
      title="Ajouter un paiement"
      model={'payments'}
      defaultData={defaultData}
      render={(data) => <PaymentForm href="/payments" {...data} />}
    />
  )
}

export default PaymentAdd
