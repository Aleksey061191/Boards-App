import React, { ReactNode, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import produce from 'immer';
import type { Identifier, XYCoord } from 'dnd-core';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { IAllTasks, ITask } from '../../store/reducers/helpers/tasksHelper';
import { setTasks } from '../../store/reducers/taskReducer';

interface IColParams {
  isOver?: boolean;
  children: ReactNode;
  indexColumn: number;
  columnId: string;
  moveItem: (
    dragIndex: number,
    hoverIndex: number,
    draggedColumnIndex: number,
    targetColumnIndex: number,
    draggedColumnId: string,
    targetColumnId: string,
    taskId: string
  ) => void;
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

const Col = (props: IColParams) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const dispatch = useAppDispatch();

  const moveTaskToColumn = (task: any) => {
    // const newTask: IUpdateTaskParams = {
    //   title: task.title,
    //   order: task.order,
    //   description: task.description,
    //   userId: task.userId,
    //   boardId: task.boardId,
    //   columnId,
    // };
    // const draggedColumnIndex = tasks.indexOf(
    //   tasks.find((item) => item.columnId === task.columnId) as IAllTasks
    // );
    // const draggedColumnIndex = tasks.indexOf(
    //   tasks.find((item) => item.tasks.find((el) => el.id === task.columnId)) as IAllTasks
    // );
    // console.log(tasks.find((item) => item.tasks.find((el) => el.id === task.columnId)));
    const targetColumnIndex = tasks.indexOf(
      tasks.find((item) => item.columnId === props.columnId) as IAllTasks
    );
    // if (!tasks[targetColumnIndex].tasks.length) {
    //   const dragIndex = tasks[draggedColumnIndex].tasks.indexOf(
    //     tasks[draggedColumnIndex].tasks.find((item) => item.id === task.id) as ITask
    //   );
    //   // console.log(tasks[draggedColumnIndex].tasks);
    //   if (dragIndex > -1) {
    //     const newTasks = produce(tasks, (draft) => {
    //       const dragged = draft[draggedColumnIndex].tasks[dragIndex];
    //       draft[draggedColumnIndex].tasks.splice(dragIndex, 1);
    //       draft[targetColumnIndex].tasks.splice(0, 0, dragged);
    //     });
    //     // console.log(tasks[draggedColumnIndex].tasks);
    //     dispatch(setTasks(newTasks));
    //   }
    // }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      // console.log(item);
      moveTaskToColumn(item);
      return { id: props.columnId };
    },
    // canDrop: (item, monitor) => {
    //   moveTaskToColumn(item);
    //   return true;
    // },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const style = {
    minHeight: 50,
    maxHeight: 250,
    overflow: 'auto',
    backgroundColor: isOver ? 'yellow' : '',
  };

  return (
    <div ref={drop} style={style}>
      {props.children}
    </div>
  );
};

export default Col;
