import { Modal, Box } from '@mui/material';

interface IModalProps {
  open: boolean;
  errMessage?: string;
  handleClose: () => void;
  children?: JSX.Element | null;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '40%',
  textAlign: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  fontSize: '22px',
};

function BasicModal(props: IModalProps): JSX.Element {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.errMessage && <p id="modal-description">{props.errMessage}</p>}
        {props.children}
      </Box>
    </Modal>
  );
}

export default BasicModal;
