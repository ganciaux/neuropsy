import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Button } from '@mui/material'
import { delay, logout } from '../../api/api'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import { userContext } from '../../AppContext'

const UserLogout = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const { status, data, error, refetch } = useQuery('logout', logout, {
    enabled: false,
    onSuccess: (data) => {
      console.log('Get data!')
      console.log(data)
      delay()
      //navigate('/login')
      window.location.replace('/login')
    },
  })

  const submitHandlerLogout = async () => {
    refetch()
  }

  return (
    <CommonPageHeader title="Logout">
      {user ? (
        <Button onClick={submitHandlerLogout}>Logout</Button>
      ) : (
        <div>You are not logged !</div>
      )}
    </CommonPageHeader>
  )
}

export default UserLogout
