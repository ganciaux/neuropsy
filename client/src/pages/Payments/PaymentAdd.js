import React from 'react'
import PaymentForm from '../../components/Payments/PaymentForm'
import Header from '../../components/common/Header/Header'
import ClientForm from '../../components/Clients/ClientForm'

const PaymentAdd = () => {
  return (
    <>
      <Header title="Ajouter un paiement" />
      <PaymentForm />
    </>
  )
}

export default PaymentAdd
