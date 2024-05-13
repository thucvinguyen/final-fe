import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";

const Modal = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  cancel,
  confirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "down",
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancel}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
