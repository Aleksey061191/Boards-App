import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/boardItem/BoardItem';
import boardsApi, { IBoardUpdateParams } from '../../services/boardsApi';
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
    upgradeBoard(state, action) {
      state.boards = state.boards.filter((board: IBoard) => board.id !== action.payload.id);
      // console.log('%cboardReducer.ts line:91 current(state', 'color: #007acc;', current(state.boards[action.payload.id]));
      // state.boards = state.boards.map((board: IBoard) =>
      // console.log('%cboardReducer.ts line:92 current(board', 'color: #007acc;', current(board);
      // )
      // )
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
  },
});

export default boardSlice.reducer;
const { createBoard, removeBoard, upgradeBoard } = boardSlice.actions;
