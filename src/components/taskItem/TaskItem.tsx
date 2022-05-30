import { useState } from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { ITask } from '../../store/reducers/taskReducer';
import BasicModal from '../basicModal/BasicModal';
import Task from '../task/Task';
import { useModal } from '../../hooks/appHooks';
import { AppDispatch } from '../../store/store';
import { deleteTask, getAllTasks } from '../../store/reducers/helpers/tasksHelper';
import cl from './TaskItem.module.scss';

const cardStyle = {
  minWidth: 300,
  minHeight: 100,
  maxWidth: 300,
  border: '1px solid #b7d2e6',
  backgroundColor: `#c7ccfe40`,
};

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

const iconButtonStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
};

export interface ITaskItemProps extends ITask {
  boardId: string;
  columnId: string;
}

function TaskItem(props: ITaskItemProps): JSX.Element {
  const [modalContent, setModalContent] = useState('');
  const { open, toggle } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleModalDelete = () => {
    setModalContent('delete');
    toggle();
  };

  const handleTaskClick = () => {
    setModalContent('edit');
    toggle();
  };

  const handleDeleteTask = async () => {
    const currTask = {
      boardId: props.boardId,
      columnId: props.columnId,
      taskId: props.id,
    };
    await dispatch(deleteTask(currTask));
    await dispatch(getAllTasks(props.boardId));
  };
  return (
    <div className={cl.container}>
      <IconButton aria-label="delete" onClick={handleModalDelete} sx={iconButtonStyles}>
        <DeleteForever />
      </IconButton>
      <Card sx={cardStyle} onClick={handleTaskClick}>
        <CardHeader title={props.title}></CardHeader>
        <CardContent>
          {props.description && (
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          )}
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
      <BasicModal open={open} handleClose={toggle}>
        <>
          {modalContent === 'edit' && <Task {...props} handleClose={toggle} />}
          {modalContent === 'delete' && (
            <Box sx={style}>
              <Typography variant="h5">{t('delete_task_mess')}</Typography>
              <Button variant="outlined" sx={{ margin: '10px' }} onClick={toggle}>
                {t('cancel')}
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ margin: '10px' }}
                onClick={handleDeleteTask}
              >
                {t('delete')}
              </Button>
            </Box>
          )}
        </>
      </BasicModal>
    </div>
  );
}

export default TaskItem;
