import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardHeader, IconButton, Modal, Button, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import AddItemButton from '../addItemButton/AddItemButton';
import TaskItem from '../taskItem/TaskItem';
import { getAllTasks } from '../../store/reducers/helpers/tasksHelper';
import { deleteColumn } from '../../store/reducers/helpers/columnHelpers';

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
export const ColumnItem: React.FC<ColumnItemProps> = ({ title, id, boardId }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(getAllTasks(boardId));
  }, [dispatch, boardId]);

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
        {tasks
          .find((item) => item.boardId === boardId && item.columnId === id)
          ?.tasks.map((item) => (
            <TaskItem key={item.id} {...item} boardId={boardId} columnId={id} />
          ))}
        <AddItemButton itemType="Task" boardId={boardId} columnId={id} />
      </Card>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5">{t('delete_col_message')}</Typography>
          <Button variant="outlined" sx={{ margin: '10px' }} onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ margin: '10px' }}
            onClick={() => dispatch(deleteColumn({ id, boardId }))}
          >
            {t('delete')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
