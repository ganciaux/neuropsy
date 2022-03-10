import { sessionTypes } from '../consts/sessionTypes'
import { sessionStatus } from '../consts/sessionStatus'

export const getTypeLabel = (value) => {
  const type = sessionTypes.find((type) => type.value === value)
  return type ? type.label : 'Error: type inconnu'
}

export const getStatusLabel = (value) => {
  const status = sessionStatus.find((status) => status.value === value)
  return status ? status.label : 'Error: statut inconnu'
}

export const getStatusSeverity = (value) => {
  const status = sessionStatus.find((status) => status.value === value)
  return status ? status.severity : 'error'
}
