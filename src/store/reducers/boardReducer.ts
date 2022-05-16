import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/BoardItem/BoardItem';

const BOARDS_URL = 'https://rs-rest-kanban.herokuapp.com/boards';

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(BOARDS_URL);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      return data;
    } catch (error) {
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
  extraReducers: {
    [fetchBoards.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchBoards.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.boards = action.payload;
    },
    [fetchBoards.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default boardSlice.reducer;
export const { createBoard, removeBoard } = boardSlice.actions;
