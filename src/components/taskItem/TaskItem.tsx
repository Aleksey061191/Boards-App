import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';
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
  minWidth: 200,
  maxHeight: 100,
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
  top: '5px',
  right: '10px',
};

export interface ITaskItemProps extends ITask {
  boardId: string;
  columnId: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number, targetColumnId: string, taskId: string) => void;
  changeColumn: (taskId: string, targetColumnId: string, draggedColumnId: string) => void;
  indexColumn: number;
}

interface IItems {
  boardId: string;
  columnId: string;
  description: string;
  id: string;
  index: number;
  order: number;
  title: string;
  userId: string;
  indexColumn: number;
}

interface IDropRez {
  dropEffect: string;
  id: string;
}

function TaskItem(props: ITaskItemProps): JSX.Element {
  const [modalContent, setModalContent] = useState('');
  const { open, toggle } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: 'task',
    hover(item: IItems, monitor) {
      const draggedColumnIndex = item.indexColumn;
      const targetColumnIndex = props.indexColumn;

      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex && draggedColumnIndex === targetColumnIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      const targetColumnId = props.columnId;
      const taskId = item.id;
      props.moveItem(dragIndex, hoverIndex, targetColumnId, taskId);

      item.index = hoverIndex;
      item.indexColumn = targetColumnIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...props },
    end: (item, monitor) => {
      const dropResult: IDropRez | null = monitor.getDropResult();
      if (dropResult) {
        const { id } = dropResult;
        const itemId = item.id;
        const colId = item.columnId;
        props.changeColumn(itemId, id, colId);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
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
    <div ref={ref} className={`${cl.container} ${isDragging && cl.drag}`}>
      <IconButton aria-label="delete" onClick={handleModalDelete} sx={iconButtonStyles}>
        <DeleteForever />
      </IconButton>
      <Card sx={cardStyle} onClick={handleTaskClick}>
        <CardHeader className={`${cl.header} ${cl.headerT}`} title={props.title}></CardHeader>
        <CardContent>
          {props.description && (
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          )}
        </CardContent>
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
