import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchDataList = (path, options = '', defaultData = []) => {
  const [error, setError] = useState({ isError: false, message: '' })
  const [data, setData] = useState(defaultData)
  const [dataFiltered, setDataFiltered] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setData(defaultData)
    const doFetch = () => {
      setIsLoading(true)
      axios
        .get(`${process.env.REACT_APP_API_URL}/${path}${options}`)
        .then((res) => {
          setData(res.data.data)
          setDataFiltered(res.data.data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err.response.data)
          setError(err)
        })
    }
    doFetch()
  }, [])

  return [
    data,
    setData,
    dataFiltered,
    setDataFiltered,
    isLoading,
    setIsLoading,
    error,
    setError,
  ]
}
