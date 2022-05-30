import { useAppDispatch, useAppSelector } from '../../../hooks/appHooks';
import { IUpdateTaskParams } from '../../../services/tasksApi';
import { ITask, updateTask } from '../../../store/reducers/helpers/tasksHelper';

interface IChangeParams {
  taskId: string;
  boardId: string;
  targetColumnId: string;
  draggedColumnId: string;
}

// const changeColumn = ({ taskId, boardId, targetColumnId, draggedColumnId }: IChangeParams) => {
//   const tasks = useAppSelector((state) => state.tasks.tasks);
//   const dispatch = useAppDispatch();
//   // const task = tasks[draggedColumnIndex].tasks[dragIndex];
//   const task = tasks
//     .map((item) => item.tasks.find((it) => it.id === taskId))
//     .filter((elem) => elem !== undefined)[0] as ITask;
//   const newTask: IUpdateTaskParams = {
//     title: task.title,
//     order: task.order,
//     description: task.description,
//     userId: task.userId,
//     boardId,
//     columnId: targetColumnId,
//   };
//   const tId = task.id;
//   dispatch(updateTask({ boardId, columnId: draggedColumnId, taskId: tId, task: newTask }));
// };

// export default changeColumn;
