import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/BoardItem/BoardItem';
import boardsApi, { IBoardUpdateParams } from '../../services/boardsApi';
import type { IBoardParams } from '../../services/boardsApi';

import { addBoard, fetchBoards, deleteBoard } from './helpers/boardHelpers';

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (data: IBoardUpdateParams, { dispatch, rejectWithValue }) => {
    try {
      const { id, title, description } = data;
      await boardsApi.updateBoard(id, { title, description }).then((response) => {
        dispatch(upgradeBoard(response.data));
      });
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
    upgradeBoard(state, action) {
      state.boards = state.boards.filter((board: IBoard) => board.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addBoard.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.boards.push(action.payload);
    });
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
    // builder.addCase(updateBoard.pending, (state) => {
    //   state.status = 'loading';
    //   state.error = null;
    // });
    // builder.addCase(updateBoard.fulfilled, (state, action) => {
    //   state.status = 'resolved';
    //   // state.boards.push(action.payload);
    // });
    // builder.addCase(updateBoard.rejected, (state, { payload }) => {
    //   state.status = 'rejected';
    //   state.error = payload as string;
    // });
    builder.addCase(deleteBoard.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter((board: IBoard) => board.id !== action.payload.id);
    });
  },
});

export default boardSlice.reducer;
const { upgradeBoard } = boardSlice.actions;
