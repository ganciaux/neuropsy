import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchModel = (id, path, defaultData = {}, options = {}) => {
  const [error, setError] = useState({ isError: false, message: '' })
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true)
      await axios
        .get(`${process.env.REACT_APP_API_URL}/${path}/${id}`)
        .then((res) => {
          setData(res.data.data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err.response.data)
          setData(defaultData)
          setError({ isError: true, message: err.response.data.message })
        })
    }
    doFetch()
  }, [])

  return [data, setData, isLoading, setIsLoading, error, setError]
}
