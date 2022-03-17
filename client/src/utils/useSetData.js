import axios from 'axios'

export const useSetData = (
  data,
  setData,
  setError,
  path,
  id,
  defaultData,
  formatData = null,
  date = 'date',
) => {
  const isNew = id ? false : true
  const handleSubmit = (e) => {
    e.preventDefault()

    if (formatData) {
      data = formatData(data)
    }

    setError({ isSuccess: false, isError: false, message: '' })
    if (isNew) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/${path}`, data)
        .then((res) => {
          setData(defaultData)
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/${path}/${data._id}`, data)
        .then((res) => {
          setError({ isSuccess: true, isError: false, message: 'Success' })
        })
        .catch((err) => {
          setError({ isError: true, message: err.response.data.message })
        })
    }
  }

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeDate = (newValue) => {
    setData({ ...data, [date]: newValue })
  }

  return [handleSubmit, handleOnChange, handleChangeDate]
}
