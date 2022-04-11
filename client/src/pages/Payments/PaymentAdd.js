import React from 'react'
import { defaultData } from '../../components/Payments/consts/defaultData'
import PaymentForm from '../../components/Payments/PaymentForm'
import ModelAdd from '../../components/Model/ModelAdd'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import useGetClient from '../../utils/useGetClient'

const PaymentAdd = () => {
  const { isLoading, data } = useGetClient(defaultData)

  if (isLoading) {
    return <CommonLoader />
  }

  return (
    <ModelAdd
      title="Ajouter un paiement"
      model={'payments'}
      defaultData={data}
      render={(data) => <PaymentForm href="/payments" {...data} />}
    />
  )
}

export default PaymentAdd
