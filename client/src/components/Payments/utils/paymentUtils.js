import { paymentTypes } from '../consts/paymentTypes'
import { paymentStatus } from '../consts/paymentStatus'

export const getTypeLabel = (value) => {
  const type = paymentTypes.find((type) => type.value === value)
  return type ? type.label : 'Error'
}

export const getStatusLabel = (value) => {
  const status = paymentStatus.find((status) => status.value === value)
  return status ? status.label : 'Error'
}
