import { orderStatus } from '../consts/orderStatus'

export const getStatusLabel = (value) => {
  const status = orderStatus.find((status) => status.value === value)
  return status ? status.label : 'Error'
}
