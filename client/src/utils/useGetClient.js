import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getData } from '../api/api'

const useGetClient = (data) => {
  const { id } = useParams()
  const { isLoading, refetch } = useQuery(
    'client',
    () => getData('/clients', id),
    {
      onSuccess: (res) => {
        data.clientId = res._id
        data.isFromClient = true
        data.back = `/clients/details/${id}`
      },
      enabled: false,
    },
  )

  useEffect(async () => {
    if (id) {
      await refetch()
    }
  }, [id])

  return { isLoading, data }
}

export default useGetClient
