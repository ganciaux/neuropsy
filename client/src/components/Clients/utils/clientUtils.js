import ClientType from './ClientType'

export const getTypeLabel = (value) => {
  const type = ClientType.find((type) => type.value === value)
  return type ? type.label : 'Error'
}
