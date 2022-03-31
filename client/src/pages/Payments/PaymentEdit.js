import React from 'react'
import PaymentForm from '../../components/Payments/PaymentForm'
import ModelEdit from '../../components/Model/ModelEdit'

const PaymentEdit = () => {
  return (
    <ModelEdit
      title="Gestion paiement"
      model={'payments'}
      modelForm={(data) => <PaymentForm href="/payments" {...data} />}
    />
  )
}

export default PaymentEdit
