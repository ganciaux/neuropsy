import { clientTypes } from './consts/clientTypes'

export const getTypeLabel = (value) => {
  const type = clientTypes.find((type) => type.value === value)
  return type ? type.label : 'Error'
}
