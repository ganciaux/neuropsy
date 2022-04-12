import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getData } from '../api/api'

const useGetClient = (data) => {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const { refetch } = useQuery('client', () => getData('/clients', id), {
    onSuccess: (res) => {
      data.clientId = res._id
      data.isFromClient = true
      data.back = `/clients/details/${id}`
    },
    enabled: false,
  })

  useEffect(() => {
    async function fetchData() {
      if (id) {
        await refetch()
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, refetch])

  return { isLoading, data }
}

export default useGetClient
