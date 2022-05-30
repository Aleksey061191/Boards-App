import { createSlice } from '@reduxjs/toolkit';
import { createTask, getAllTasks, deleteTask } from './helpers/tasksHelper';

export interface IColumn {
  id: string;
  title: string;
  description: string;
  boardId: string;
  order: number;
}

interface IFile {
  filename: string;
  fileSize: number;
}

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: IFile[];
}

export interface IColumnResponse {
  id: string;
  order: number;
  title: string;
  tasks: ITask[];
}

export interface IAllTasks {
  boardId: string;
  columnId: string;
  tasks: ITask[];
}

interface ITaskState {
  tasks: IAllTasks[];
  error: string | null;
}
const initialState: ITaskState = {
  tasks: [],
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getAllTasks.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.error = null;
    });
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
