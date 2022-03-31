import { paymentTypes } from '../consts/paymentTypes'
import { paymentStatus } from '../consts/paymentStatus'

export const getStatus = (value) => {
  const status = paymentStatus.find((status) => status.value === value)
  return status
}

export const getTypeLabel = (value) => {
  const type = paymentTypes.find((type) => type.value === value)
  return type ? type.label : 'Error: type inconnu'
}

export const getTypeIcon = (value) => {
  const type = paymentTypes.find((type) => type.value === value)
  return type ? type.icon : 'Error: type inconnu'
}

export const getStatusLabel = (value) => {
  const status = getStatus(value)
  return status ? status.label : 'Error: statut inconnu'
}

export const getStatusSeverity = (value) => {
  const status = getStatus(value)
  return status ? status.severity : 'error'
}
