import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/BoardItem/BoardItem';

export interface IBoardState {
  boards: IBoard[];
}

export const initialState: IBoardState = {
  boards: [],
};

const BOARDS_URL = 'https://rs-rest-kanban.herokuapp.com/boards';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async function () {
  const response = await fetch(BOARDS_URL);
  const data = await response.json();
  return data;
});

const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    status: null,
    error: null,
  },
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
});

export default boardSlice.reducer;
export const { createBoard, removeBoard } = boardSlice.actions;
