import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Button,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './boardItem.css';
import { useDispatch } from 'react-redux';
import { removeBoard } from '../../store/reducers/boardReducer';

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
export interface IBoard {
  id: string;
  title: string;
  description: string;
}

const BoardItem = ({ title, description, id }: IBoard) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch();

  return (
    <>
      <Card sx={{ minWidth: 300, maxWidth: 500 }}>
        <CardHeader
          title={title}
          action={
            <IconButton aria-label="delete" onClick={handleOpen}>
              <HighlightOffIcon />
            </IconButton>
          }
        ></CardHeader>
        <CardContent>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5"> Are you sure you want to delete this board?</Typography>
          <Button variant="outlined" sx={{ margin: '10px' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ margin: '10px' }}
            onClick={() => dispatch(removeBoard({ id }))}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BoardItem;
