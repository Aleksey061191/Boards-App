import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';
import { useAppSelector } from '../../hooks/appHooks';
import { IAllTasks, ITask } from '../../store/reducers/helpers/tasksHelper';

interface IColParams {
  isOver?: boolean;
  children: ReactNode;
  indexColumn: number;
  columnId: string;
  moveItem: (dragIndex: number, hoverIndex: number, targetColumnId: string, taskId: string) => void;
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

  const moveTaskToColumn = (item: IItems) => {
    const targetColumnIndex = tasks.indexOf(
      tasks.find((el) => el.columnId === props.columnId) as IAllTasks
    );
    if (!tasks[targetColumnIndex].tasks.length) {
      const task = tasks
        .map((el) => el.tasks.find((it) => it.id === item.id))
        .filter((elem) => elem !== undefined)[0] as ITask;

      let dragIndex = 0;
      tasks.forEach((el) => {
        if (el.tasks.includes(task)) {
          dragIndex = el.tasks.indexOf(task);
        }
      });
      props.moveItem(dragIndex, 0, props.columnId, item.id);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: () => {
      return { id: props.columnId };
    },
    canDrop: (item: IItems) => {
      moveTaskToColumn(item);
      return true;
    },
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
