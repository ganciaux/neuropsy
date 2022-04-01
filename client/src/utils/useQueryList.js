import { useQuery } from 'react-query'
import { getData } from '../api/api'

export const useQueryList = (path) => {
  return useQuery([path], () => getData('/' + path))
}
