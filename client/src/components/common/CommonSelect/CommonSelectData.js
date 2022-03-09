import axios from 'axios'
import React, { useEffect } from 'react'
import CommonSelect from './CommonSelect'

const CommonSelectData = ({
  id,
  label,
  name,
  value,
  onChange,
  setIsLoading,
  model,
  placeHolder,
  query = '',
}) => {
  const [data, setData] = React.useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/${model}${query}`)
      .then((res) => {
        setData(
          res.data.data.map((data) => {
            return { id: data._id, value: data._id, label: data._name }
          }),
        )
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [])

  return (
    <CommonSelect
      id={id}
      label={label}
      name={name}
      data={data}
      value={value}
      placeHolder={placeHolder}
      onChange={onChange}
    />
  )
}

export default CommonSelectData
