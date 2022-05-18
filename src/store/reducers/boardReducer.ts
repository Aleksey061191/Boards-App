import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/BoardItem/BoardItem';

// const BOARDS_URL = 'https://rs-rest-kanban.herokuapp.com/boards';

const BOARDS_URL = 'https://my-json-server.typicode.com/makhitr/test2';
const path = {
  user: '/user',
  boards: '/boards',
};

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BOARDS_URL}${path.boards}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${BOARDS_URL}${path.boards}/${id}`);
      // dispatch(removeBoard({ id }));
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};
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
      const board: IBoard = {
        id: new Date().toISOString(),
        title: action.payload.title,
        description: action.payload.description,
      };
      state.boards.push(board);
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
    builder.addCase(fetchBoards.rejected, setError);
    builder.addCase(deleteBoard.rejected, setError);
  },
});

export default boardSlice.reducer;
export const { createBoard, removeBoard } = boardSlice.actions;
