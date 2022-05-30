import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import boardsApi, {
  IBoardGetParams,
  IBoardParams,
  IBoardUpdateParams,
} from '../../../services/boardsApi';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await boardsApi.getAllBoards();
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (text: IBoardParams, { rejectWithValue }) => {
    try {
      const rez = await boardsApi
        .createBoard({
          title: text.title,
          description: text.description,
        })
        .then((response) => response.data);
      return rez;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (data: IBoardUpdateParams, { rejectWithValue }) => {
    try {
      const { id, title, description } = data;
      const rez = await boardsApi.updateBoard(id, { title, description }).then((response) => {
        return response.data;
      });
      return rez;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async (data: IBoardGetParams, { rejectWithValue }) => {
    try {
      const { id } = data;
      const rez = await boardsApi.getBoard(id).then((response) => {
        return response.data;
      });
      return rez;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      await boardsApi.deleteBoard(id);
      return { id };
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
