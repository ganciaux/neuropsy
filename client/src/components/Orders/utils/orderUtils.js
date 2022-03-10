import { orderStatus } from '../consts/orderStatus'

export const getStatus = (value) => {
  const status = orderStatus.find((status) => status.value === value)
  return status
}

export const getStatusLabel = (value) => {
  const status = getStatus(value)
  return status ? status.label : 'Error'
}

export const getStatusSeverity = (value) => {
  const status = getStatus(value)
  return status ? status.severity : 'error'
}
