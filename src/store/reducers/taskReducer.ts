import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import tasksApi, { ITasksParams } from '../../services/tasksApi';
import boardsApi from '../../services/boardsApi';

export interface IColumn {
  id: string;
  title: string;
  description: string;
  boardId: string;
  order: number;
}

interface ICreateTaskApi {
  boardId: string;
  columnId: string;
  task: ITasksParams;
}

interface IDeleteTaskApi {
  boardId: string;
  columnId: string;
  taskId: string;
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
  async (data: ICreateTaskApi, { rejectWithValue }) => {
    const { boardId, columnId, task } = data;
    try {
      await tasksApi.createTask(boardId, columnId, task);
      return {};
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  'tasks/getAllTasks',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const allboardTasks = await (await boardsApi.getBoard(boardId)).data;
      const alltasks = allboardTasks.columns.map((item: IColumnResponse) => {
        const newItem: IAllTasks = {
          boardId,
          columnId: item.id,
          tasks: item.tasks,
        };
        return newItem;
      });
      return alltasks;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (data: IDeleteTaskApi, { rejectWithValue }) => {
    const { boardId, columnId, taskId } = data;
    try {
      const response = await tasksApi.deleteTask(boardId, columnId, taskId);
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      // state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getAllTasks.pending, (state) => {
      // state.status = 'loading';
      state.error = null;
    });
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      // state.status = 'resolved';
      state.tasks = payload;
    });
    builder.addCase(deleteTask.pending, (state) => {
      // state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      // state.status = 'resolved';
    });
  },
});

export default tasksSlice.reducer;
// const { createTask } = tasksSlice.actions;
