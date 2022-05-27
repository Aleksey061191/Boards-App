import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  CardActionArea,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch } from 'react-redux';
import { ITask } from '../../store/reducers/taskReducer';
import BasicDialog from '../basicDialog/BasicDIalog';
import BasicModal from '../basicModal/BasicModal';
import Task from '../task/Task';
import { useDialog, useModal } from '../../hooks/appHooks';
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
  const { openD, toggleD } = useDialog();
  const { open, toggle } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

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
      <IconButton aria-label="delete" onClick={toggleD} sx={iconButtonStyles}>
        <HighlightOffIcon />
      </IconButton>
      <Card sx={cardStyle} onClick={toggle}>
        {/* <CardActionArea> */}
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
      <BasicDialog
        open={openD}
        title={t('delete_task_title')}
        message={t('delete_task_mess')}
        handleCancel={toggleD}
        handleOk={handleDeleteTask}
        children={null}
      />
      <BasicModal open={open} handleClose={toggle} children={<Task {...props} />} />
    </div>
  );
}

export default TaskItem;
