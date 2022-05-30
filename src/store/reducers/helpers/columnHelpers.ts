import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import columnsApi, {
  ICreateColumnParams,
  IDeleteColumnParams,
  IUpdateColumnParams,
} from '../../../services/columnsApi';

interface ISortParams {
  id: string;
  order: number;
  title: string;
}

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await columnsApi.getAllColumns(boardId);
      (response.data as ISortParams[]).sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        }
        if (a.order < b.order) {
          return -1;
        }
        return 0;
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (data: ICreateColumnParams, { rejectWithValue }) => {
    const { boardId, title } = data;
    try {
      const rez = await columnsApi
        .createColumn(boardId, { title })
        .then((response) => response.data);
      return rez;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async (data: IUpdateColumnParams, { rejectWithValue }) => {
    const { boardId, columnId, title, order } = data;
    try {
      const rez = await columnsApi
        .updateColumn(boardId, columnId, { title, order })
        .then((response) => response.data);
      return rez;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (data: IDeleteColumnParams, { rejectWithValue }) => {
    const { id, boardId } = data;
    try {
      await columnsApi.deleteColumn(boardId, id);
      return { id };
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
