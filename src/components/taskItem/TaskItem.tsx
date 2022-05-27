import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch } from 'react-redux';
import { ITask } from '../../store/reducers/taskReducer';
import BasicDialog from '../basicDialog/BasicDIalog';
import { useDialog } from '../../hooks/appHooks';
import { AppDispatch } from '../../store/store';
import { deleteTask, getAllTasks } from '../../store/reducers/helpers/tasksHelper';

interface ITaskItemProps extends ITask {
  boardId: string;
  columnId: string;
  index: number;
  moveItem: (
    dragIndex: number,
    hoverIndex: number,
    draggedColumnIndex: number,
    targetColumnIndex: number
  ) => void;
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

function TaskItem(props: ITaskItemProps): JSX.Element {
  const { openD, toggleD } = useDialog();
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
      // console.log(props.columnId);

      props.moveItem(dragIndex, hoverIndex, draggedColumnIndex, targetColumnIndex);

      item.index = hoverIndex;
      item.indexColumn = targetColumnIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...props },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const cardStyle = {
    minWidth: 300,
    minHeight: 100,
    maxWidth: 300,
    margin: '5px',
    opacity: isDragging ? 0 : 1,
  };

  const handleClick = () => {
    console.log(props);
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
    <>
      <Card ref={ref} sx={cardStyle}>
        <CardHeader
          title={props.title}
          action={
            <IconButton aria-label="delete" onClick={toggleD}>
              <HighlightOffIcon />
            </IconButton>
          }
        ></CardHeader>
        <CardContent onClick={handleClick}>
          {props.description && (
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          )}
        </CardContent>
      </Card>
      <BasicDialog
        open={openD}
        title="Delete task?"
        message="Do you want delete task permanently?"
        handleCancel={toggleD}
        handleOk={handleDeleteTask}
        children={null}
      />
    </>
  );
}

export default TaskItem;
