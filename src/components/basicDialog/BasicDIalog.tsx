import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from '@mui/material';

interface IDialogProps {
  open: boolean;
  message: string;
  title: string;
  handleOk: () => void;
  handleCancel: () => void;
}

function BasicDialog(props: IDialogProps): JSX.Element {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleOk}>OK</Button>
        <Button onClick={props.handleCancel} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BasicDialog;
