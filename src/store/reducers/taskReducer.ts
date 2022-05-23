import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import tasksApi, { ITasksParams } from '../../services/tasksApi';

interface ICreateTaskApi {
  boardId: string;
  columnId: string;
  task: ITasksParams;
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
  boardId: string;
  columnId: string;
  files: IFile[];
}

interface ITaskState {
  tasks: ITask[];
  // status: string | null;
  error: string | null;
}
const initialState: ITaskState = {
  tasks: [],
  // status: null,
  error: null,
};

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data: ICreateTaskApi, { rejectWithValue, dispatch }) => {
    const { boardId, columnId, task } = data;
    try {
      const response = await tasksApi.createTask(boardId, columnId, task);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  'tasks/createTask',
  async (data: ICreateTaskApi, { rejectWithValue, dispatch }) => {
    const { boardId, columnId, task } = data;
    try {
      const response = await tasksApi.createTask(boardId, columnId, task);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // createColumn(state, action) {
    //   state.columns.push(action.payload);
    // },
    // removeColumn(state, action) {
    //   state.columns = state.columns.filter((column: IColumn) => column.id !== action.payload.id);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      // state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      // state.status = 'resolved';
      const newTask = payload;
      state.tasks.push(newTask);
      console.log(state);
    });
    // builder.addCase(fetchColumns.rejected, (state, { payload }) => {
    //   state.status = 'rejected';
    //   state.error = payload as string;
    // });
    // builder.addCase(deleteColumn.rejected, (state, { payload }) => {
    //   state.status = 'rejected';
    //   state.error = payload as string;
    // });
  },
});

export default tasksSlice.reducer;
// const { createTask } = tasksSlice.actions;