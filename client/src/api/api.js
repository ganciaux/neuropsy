import axios from 'axios'

export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const getData = async (path, id) => {
  /*
    const params = new URLSearchParams()
    params.set('limit', 10)
    params.toString()
  */
  console.log('getData', path, id)
  const url = id ? `${path}/${id}` : path
  return await axios
    .get(`${process.env.REACT_APP_API_URL}${url}`)
    .then((res) => {
      console.log('api: getData:', id, res.data.data)
      return res.data.data
    })
    .catch((err) => {
      console.log(err.response.data)
      throw err.response.data
    })
}

export const createData = async ({ path, ...data }) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}${path}`, data)
    .then((res) => {
      console.log('api: createData:', res.data.data)
    })
    .catch((err) => {
      console.log(err.response.data)
      throw err.response.data
    })
}

export const updateData = async ({ path, ...data }) => {
  const url = data.id ? `${path}/${data.id}` : path
  console.log('api: updateData:', data)
  return await axios
    .put(`${process.env.REACT_APP_API_URL}${url}`, data)
    .then((res) => {
      console.log('api: updateData:', res.data.data)
    })
    .catch((err) => {
      console.log(err.response.data)
      throw err.response.data
    })
}

export const deleteData = async (path, id, data, setData) => {
  return await axios
    .delete(`${process.env.REACT_APP_API_URL}${path}/${id}`)
    .then((res) => {
      console.log('api: deleteData:')
      setData(data.filter((d) => d._id !== id))
    })
    .catch((err) => {
      console.log(err.response.data)
      throw err.response.data
    })
}

export const printData = (path, id, filename) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}${path}/${id}`, {
      responseType: 'blob',
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${filename}.pdf`) //or any other extension
      document.body.appendChild(link)
      link.click()
      //setError({ isSuccess: true, isError: false, message: 'Success' })
    })
    .catch((err) => {
      console.log(err.response.data)
      throw err.response.data
    })
}
