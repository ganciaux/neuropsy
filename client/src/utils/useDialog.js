import { useState } from 'react'
import { deleteData } from '../api/api'
import CommonDialog from '../bkp/components/common/CommonDialog/CommonDialog'

export const useDialog = (title, path, data, setData) => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()

  const handleCloseOk = () => {
    setOpen(false)
    deleteData(path, id, data, setData)
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  const render = () => (
    <CommonDialog
      title={title}
      open={open}
      handleCloseOk={handleCloseOk}
      handleCloseCancel={handleCloseCancel}
    />
  )

  return { render, setOpen, setId }
}
