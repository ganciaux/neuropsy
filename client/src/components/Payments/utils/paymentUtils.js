import { paymentTypes } from '../consts/paymentTypes'

export const getTypeLabel = (value) => {
  const type = paymentTypes.find((type) => type.value === value)
  return type ? type.label : 'Error'
}
