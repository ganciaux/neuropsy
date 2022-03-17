import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchData = (id, path, defaultData, options = {}) => {
  const [error, setError] = useState({ isError: false, message: '' })
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const isId = id ? true : false

  /*
  if (defaultData && options) {
    defaultData = { ...defaultData, ...options }
  }
  */

  console.log('usefetch', id, isId, isLoading, data, defaultData, options)
  useEffect(() => {
    setData(defaultData)
    const doFetch = () => {
      setIsLoading(true)
      axios
        .get(`${process.env.REACT_APP_API_URL}/${path}/${id}`)
        .then((res) => {
          setData(res.data.data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err.response.data)
          setError(err)
        })
    }

    if (!isId) {
      setIsLoading(false)
    } else if (isId && isLoading) {
      doFetch()
    } else {
      setIsLoading(false)
    }
  }, [])

  return [data, setData, isLoading, setIsLoading, error, setError]
}
