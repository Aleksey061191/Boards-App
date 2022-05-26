import * as React from 'react';
import { Box, Card, CardHeader, IconButton, Modal, Button, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch } from 'react-redux';
import { deleteColumn } from '../../store/reducers/columnReducer';
import { AppDispatch } from '../../store/store';

export interface IColumn {
  id: string;
  title: string;
  description: string;
  boardId: string;
  order: number;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ColumnItemProps {
  title: string;
  id: string;
  boardId: string;
}
const ColumnItem: React.FC<ColumnItemProps> = ({ title, id, boardId }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Card sx={{ minWidth: 300, minHeight: 300, maxWidth: 500 }}>
        <CardHeader
          title={title}
          action={
            <IconButton aria-label="delete" onClick={handleOpen}>
              <HighlightOffIcon />
            </IconButton>
          }
        ></CardHeader>
        <div> I am from board {boardId}</div>
      </Card>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5"> Are you sure you want to delete this Column?</Typography>
          <Button variant="outlined" sx={{ margin: '10px' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ margin: '10px' }}
            onClick={() => dispatch(deleteColumn({ id, boardId }))}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ColumnItem;
