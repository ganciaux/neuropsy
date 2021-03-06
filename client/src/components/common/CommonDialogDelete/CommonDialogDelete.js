import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { deleteData } from '../../../api/api'

export function CommonDialogDelete({
  title = 'Supprimer ?',
  content = '...',
  path,
  id,
  data,
  setData,
}) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseOk = () => {
    setOpen(false)
    console.log('delete: ', path, id)
    setData(data.filter((d) => d._id !== id))
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <DeleteForeverIcon
        sx={{ cursor: 'pointer' }}
        color="error"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOk}>Supprimer</Button>
          <Button onClick={handleCloseCancel} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
