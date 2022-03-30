import { useQuery } from 'react-query'
import { getData } from '../api/api'

export const useFormQueryList = (path) => {
  return useQuery([path], () => getData('/' + path))
}
