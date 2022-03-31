import React from 'react'
import { defaultData } from '../../components/Payments/consts/defaultData'
import PaymentForm from '../../components/Payments/PaymentForm'
import ModelAdd from '../../components/Model/ModelAdd'

const PaymentAdd = () => {
  return (
    <ModelAdd
      title="Ajouter paiement"
      model={'payments'}
      defaultData={defaultData}
      modelForm={(data) => <PaymentForm href="/payments" {...data} />}
    />
  )
}

export default PaymentAdd
