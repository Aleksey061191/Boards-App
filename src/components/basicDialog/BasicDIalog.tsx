import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IDialogProps {
  open: boolean;
  message: string;
  title: string;
  handleOk: () => void;
  handleCancel: () => void;
  children: JSX.Element | null;
}

function BasicDialog(props: IDialogProps): JSX.Element {
  const { t } = useTranslation();
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
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleOk}>{t('delete')}</Button>
        <Button onClick={props.handleCancel} autoFocus>
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BasicDialog;
