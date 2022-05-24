import { createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/BoardItem/BoardItem';
import { addBoard, fetchBoards, deleteBoard } from './helpers/boardHelpers';

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
  reducers: {},
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
