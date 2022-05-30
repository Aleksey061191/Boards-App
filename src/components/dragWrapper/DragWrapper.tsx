import produce from 'immer';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { IUpdateTaskParams } from '../../services/tasksApi';
import { IAllTasks, ITask } from '../../store/reducers/helpers/tasksHelper';
import { setTasks } from '../../store/reducers/taskReducer';

interface IDropwrapperParams {
  children: JSX.Element;
  columnId: string;
}

const DropWrapper = ({ children, columnId }: IDropwrapperParams) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();

  const moveTaskToColumn = (task: any) => {
    const newTask: IUpdateTaskParams = {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId: task.boardId,
      columnId,
    };
    const draggedColumnIndex = tasks.indexOf(
      tasks.find((item) => item.columnId === task.columnId) as IAllTasks
    );
    const targetColumnIndex = tasks.indexOf(
      tasks.find((item) => item.columnId === columnId) as IAllTasks
    );
    if (!tasks[targetColumnIndex].tasks.length) {
      const dragIndex = tasks[draggedColumnIndex].tasks.indexOf(
        tasks[draggedColumnIndex].tasks.find((item) => item.id === task.id) as ITask
      );
      if (dragIndex > -1) {
        const newTasks = produce(tasks, (draft) => {
          const dragged = draft[draggedColumnIndex].tasks[dragIndex];
          draft[draggedColumnIndex].tasks.splice(dragIndex, 1);
          draft[targetColumnIndex].tasks.splice(0, 0, dragged);
        });
        // console.log(tasks[draggedColumnIndex].tasks);
        dispatch(setTasks(newTasks));
      }
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      // console.log(item);
      moveTaskToColumn(item);
      return { id: columnId };
    },
    // canDrop: (item, monitor) => {
    //   moveTaskToColumn(item);
    //   return true;
    // },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return <div ref={drop}>{React.cloneElement(children, { isOver })}</div>;
};

export default DropWrapper;
