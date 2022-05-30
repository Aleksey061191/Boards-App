import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, CardHeader, IconButton, Button, Typography } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './boardItem.css';
import { AppDispatch } from '../../store/store';
import { deleteBoard } from '../../store/reducers/helpers/boardHelpers';
import BasicModal from '../basicModal/BasicModal';

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

const cardStyle = { minWidth: 200, minHeight: 100, maxWidth: '100%', backgroundColor: '#e6ecf0' };

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

const BoardItem = ({ title, description, id }: IBoard) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="board-item">
      <Card sx={cardStyle} onClick={handleClick}>
        <CardHeader
          title={title}
          action={
            <IconButton aria-label="delete" onClick={handleOpen}>
              <DeleteForever />
            </IconButton>
          }
        />
        <CardContent>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
      <BasicModal open={isModalOpen} handleClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5"> {t('delete_board_message')}</Typography>
          <Button variant="outlined" sx={{ margin: '10px' }} onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button
            sx={{ margin: '10px' }}
            variant="contained"
            color="error"
            onClick={() => dispatch(deleteBoard(id))}
          >
            {t('delete')}
          </Button>
        </Box>
      </BasicModal>
    </div>
  );
};

export default BoardItem;
