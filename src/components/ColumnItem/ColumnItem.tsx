import * as React from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardHeader, IconButton, Button, Typography } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import AddItemButton from '../addItemButton/AddItemButton';
import TaskItem from '../taskItem/TaskItem';
import { getAllTasks, ITask, updateTask } from '../../store/reducers/helpers/tasksHelper';
import { deleteColumn } from '../../store/reducers/helpers/columnHelpers';
import { setTasks } from '../../store/reducers/taskReducer';
import Col from '../col/Col';
import { IUpdateTaskParams } from '../../services/tasksApi';
import BasicModal from '../basicModal/BasicModal';
import { useTitleInput } from '../../hooks/appHooks';
import TitleInput from '../titleInput/TitleInput';
import { ItemType } from '../addItemButton/AddItemButton';

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
  moveColumn: (dragIndex: number, hoverIndex: number, columnId: string, title: string) => void;
  order: number;
}

interface IDropItem {
  title: string;
  boardId: string;
  id: string;
  indexColumn: number;
}

const columnStyle = {
  minWidth: 300,
  minHeight: 100,
  maxWidth: 500,
  backgroundColor: '#eeeaea',
  padding: '5px',
};

export const ColumnItem: React.FC<ColumnItemProps> = ({
  title,
  id,
  boardId,
  indexColumn,
  moveColumn,
  order,
}) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { isTitleChanged, inputOpened, inputClosed } = useTitleInput();

  React.useEffect(() => {
    dispatch(getAllTasks(boardId));
  }, [dispatch, boardId]);

  const ref = React.useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: 'column',
    hover(item: IDropItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.indexColumn;
      const hoverIndex = indexColumn;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      const columnId = item.id;
      const columnTitle = item.title;
      moveColumn(dragIndex, hoverIndex, columnId, columnTitle);

      item.indexColumn = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: 'column',
    item: { title, boardId, id, indexColumn },
  });

  drag(drop(ref));

  const moveItem = (
    dragIndex: number,
    hoverIndex: number,
    targetColumnId: string,
    taskId: string
  ) => {
    const task = tasks
      .map((item) => item.tasks.find((it) => it.id === taskId))
      .filter((elem) => elem !== undefined)[0] as ITask;

    const newArr = tasks.map((arr) => {
      const newT = arr.tasks.slice();
      if (newT.includes(task)) {
        newT.splice(dragIndex, 1);
      }

      if (arr.columnId === targetColumnId) {
        newT.splice(hoverIndex, 0, task);
      }

      return { boardId: arr.boardId, columnId: arr.columnId, tasks: newT };
    });

    dispatch(setTasks(newArr));
  };

  const changeColumn = (taskId: string, targetColumnId: string, draggedColumnId: string) => {
    const task = tasks
      .map((item) => item.tasks.find((it) => it.id === taskId))
      .filter((elem) => elem !== undefined)[0] as ITask;
    let taskIndex = 0;
    tasks.forEach((item) => {
      if (item.tasks.includes(task)) {
        taskIndex = item.tasks.indexOf(task);
      }
    });
    const newTask: IUpdateTaskParams = {
      userId: task.userId,
      title: task.title,
      description: task.description,
      order: taskIndex + 1,
      boardId,
      columnId: targetColumnId,
    };
    const tId = task.id;
    dispatch(updateTask({ boardId, columnId: draggedColumnId, taskId: tId, task: newTask }));
  };

  return (
    <>
      <Card ref={ref} sx={columnStyle}>
        {!isTitleChanged ? (
          <CardHeader
            title={title}
            action={
              <IconButton aria-label="delete" onClick={handleOpen}>
                <DeleteForever />
              </IconButton>
            }
            onClick={() => inputOpened()}
          />
        ) : (
          <CardHeader
            title={
              <TitleInput
                title={title}
                inputClosed={inputClosed}
                boardId={boardId}
                id={id}
                itemType={ItemType.Column}
                order={order}
              />
            }
          />
        )}

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
        <AddItemButton itemType="Task" boardId={boardId} columnId={id} />
      </Card>
      <BasicModal open={isModalOpen} handleClose={handleClose}>
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
      </BasicModal>
    </>
  );
};

export default ColumnItem;
