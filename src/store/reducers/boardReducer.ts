import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/boardItem/BoardItem';
import boardsApi from '../../services/boardsApi';
import type { IBoardParams } from '../../services/boardsApi';

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
  async (text: IBoardParams, { rejectWithValue, dispatch }) => {
    try {
      await boardsApi
        .createBoard({
          title: text.title,
          description: text.description,
        })
        .then((response) => {
          dispatch(createBoard(response.data));
        });
      return {};
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await boardsApi.deleteBoard(id);
      dispatch(removeBoard({ id }));
      return {};
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);
interface IBoardsState {
  boards: IBoard[];
  status: string | null;
  error: string | null;
}
const initialState: IBoardsState = {
  boards: [],
  status: null,
  error: null,
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    createBoard(state, action) {
      state.boards.push(action.payload);
    },
    removeBoard(state, action) {
      state.boards = state.boards.filter((board: IBoard) => board.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
    builder.addCase(deleteBoard.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
  },
});

export default boardSlice.reducer;
const { createBoard, removeBoard } = boardSlice.actions;
