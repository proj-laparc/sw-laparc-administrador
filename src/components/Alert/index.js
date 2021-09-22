import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Alert({ open, setOpen, alert }) {
  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alert.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={alert.functions[0] ? alert.functions[0] : handleClose}
            color="primary"
          >
            {alert.options[0]}
          </Button>
          <Button
            onClick={alert.functions[1] ? alert.functions[1] : handleClose}
            color="primary"
            autoFocus
          >
            {alert.options[1]}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
