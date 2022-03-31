import React, { useState } from 'react'
import PaymentTable from '../../components/Payments/PaymentTable'
import ModelList from '../../components/Model/ModelList'

const Payments = () => {
  const render = (data) => {
    return (
      <PaymentTable
        isLoading={data.isLoading}
        isSuccess={data.isSuccess}
        data={data.data}
      />
    )
  }

  return (
    <ModelList
      title="Liste des paiements"
      model={'payments'}
      render={(data) => render({ ...data })}
    ></ModelList>
  )
}

export default Payments
