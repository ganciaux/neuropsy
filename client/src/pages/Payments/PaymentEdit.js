import React from 'react'
import PaymentForm from '../../components/Payments/PaymentForm'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header/Header'

const PaymentEdit = () => {
  const { id } = useParams()
  return (
    <>
      <Header title="Modification du paiement" />
      <PaymentForm id={id} />
    </>
  )
}

export default PaymentEdit
