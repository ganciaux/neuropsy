import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'

const CommonDialog = ({ handleOk, handleCancel }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Some dialog...
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleOk}>Valider</Button>
          <Button onClick={handleCancel}>Annuller</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default CommonDialog
