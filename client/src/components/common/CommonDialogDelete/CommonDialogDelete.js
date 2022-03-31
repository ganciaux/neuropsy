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
  title = 'delete',
  content = '...',
  path,
  row,
  data,
  setData,
}) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseOk = () => {
    setOpen(false)
    setData(data.filter((d) => d._id !== row._id))
  }

  const handleCloseCancel = () => {
    setOpen(false)
  }

  return (
    <div>
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
    </div>
  )
}
