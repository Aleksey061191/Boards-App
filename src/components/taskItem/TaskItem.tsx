import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
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
  minWidth: 250,
  maxHeight: 150,
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
  index: number;
  moveItem: (
    dragIndex: number,
    hoverIndex: number,
    draggedColumnIndex: number,
    targetColumnIndex: number,
    draggedColumnId: string,
    targetColumnId: string,
    taskId: string
  ) => void;
  changeColumn: (
    taskId: string,
    boardId: string,
    targetColumnId: string,
    draggedColumnId: string
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

interface IDropRez {
  dropEffect: string;
  id: string;
}

function TaskItem(props: ITaskItemProps): JSX.Element {
  const { openD, toggleD } = useDialog();
  const { open, toggle } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: 'task',
    hover(item: IItems, monitor) {
      const draggedColumnIndex = item.indexColumn;
      const targetColumnIndex = props.indexColumn;

      // console.log(monitor.canDrop());
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

      const draggedColumnId = item.columnId;
      const targetColumnId = props.columnId;
      const taskId = item.id;
      props.moveItem(
        dragIndex,
        hoverIndex,
        draggedColumnIndex,
        targetColumnIndex,
        draggedColumnId,
        targetColumnId,
        taskId
      );

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
        // console.log(item, id);
        const itemId = item.id;
        const bId = item.boardId;
        const colId = item.columnId;
        props.changeColumn(itemId, bId, id, colId);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

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
        title="Delete task?"
        message="Do you want delete task permanently?"
        handleCancel={toggleD}
        handleOk={handleDeleteTask}
        children={null}
      />
      <BasicModal open={open} handleClose={toggle} children={<Task {...props} />} />
    </div>
  );
}

export default TaskItem;
