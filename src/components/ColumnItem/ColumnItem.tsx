import * as React from 'react';
import produce from 'immer';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { Box, Card, CardHeader, IconButton, Modal, Button, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import AddItemButton from '../addItemButton/AddItemButton';
import TaskItem from '../taskItem/TaskItem';
import { getAllTasks, ITask, updateTask } from '../../store/reducers/helpers/tasksHelper';
import { deleteColumn } from '../../store/reducers/helpers/columnHelpers';
import { setTasks } from '../../store/reducers/taskReducer';
import DropWrapper from '../dragWrapper/DragWrapper';
import Col from '../col/Col';
import { IUpdateTaskParams } from '../../services/tasksApi';

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
  indexColumn: number;
}

interface IChangeParams {
  taskId: string;
  boardId: string;
  targetColumnId: string;
  draggedColumnId: string;
}

const columnStyle = {
  minWidth: 300,
  minHeight: 100,
  maxWidth: 500,
  backgroundColor: '#eeeaea',
  padding: '5px',
};

export const ColumnItem: React.FC<ColumnItemProps> = ({ title, id, boardId, indexColumn }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getAllTasks(boardId));
  }, [dispatch, boardId]);

  const moveItem = (
    dragIndex: number,
    hoverIndex: number,
    draggedColumnIndex: number,
    targetColumnIndex: number,
    draggedColumnId: string,
    targetColumnId: string,
    taskId: string
  ) => {
    const newTasks = produce(tasks, (draft) => {
      const dragged = draft[draggedColumnIndex].tasks[dragIndex];
      draft[draggedColumnIndex].tasks.splice(dragIndex, 1);
      draft[targetColumnIndex].tasks.splice(hoverIndex, 0, dragged);
    });

    const task = newTasks
      .map((item) => item.tasks.find((it) => it.id === taskId))
      .filter((elem) => elem !== undefined)[0] as ITask;

    const newTask: IUpdateTaskParams = {
      title: task.title,
      order: hoverIndex + 1,
      description: task.description,
      userId: task.userId,
      boardId,
      columnId: targetColumnId,
    };
    // console.log(newTask);
    // dispatch(updateTask({ boardId, columnId: draggedColumnId, taskId, task: newTask }));

    dispatch(setTasks(newTasks));
  };

  const changeColumn = (
    taskId: string,
    bId: string,
    targetColumnId: string,
    draggedColumnId: string
  ) => {
    // const task = tasks[draggedColumnIndex].tasks[dragIndex];
    const task = tasks
      .map((item) => item.tasks.find((it) => it.id === taskId))
      .filter((elem) => elem !== undefined)[0] as ITask;
    const newTask: IUpdateTaskParams = {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId,
      columnId: targetColumnId,
    };
    const tId = task.id;
    // console.log(tasks);
    dispatch(updateTask({ boardId, columnId: draggedColumnId, taskId: tId, task: newTask }));
  };

  return (
    <>
      <Card sx={columnStyle}>
        <CardHeader
          title={title}
          action={
            <IconButton aria-label="delete" onClick={handleOpen}>
              <HighlightOffIcon />
            </IconButton>
          }
        ></CardHeader>
        <DropWrapper columnId={id}>
          <Col indexColumn={indexColumn} moveItem={moveItem} columnId={id}>
            {tasks
              .find((item) => item.boardId === boardId && item.columnId === id)
              ?.tasks.map((item, index) => (
                <TaskItem
                  key={item.id}
                  {...item}
                  boardId={boardId}
                  columnId={id}
                  indexColumn={indexColumn}
                  index={index}
                  moveItem={moveItem}
                  changeColumn={changeColumn}
                />
              ))}
          </Col>
        </DropWrapper>

        <AddItemButton itemType="Task" boardId={boardId} columnId={id} />
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
