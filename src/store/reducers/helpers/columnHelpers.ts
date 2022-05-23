import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import columnsApi, { ICreateColumnParams, IDeleteColumnParams } from '../../../services/columnsApi';

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await columnsApi.getAllColumns(boardId);
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
