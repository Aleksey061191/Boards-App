import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IBoard } from '../../components/boardItem/BoardItem';

export const BOARDS_URL = 'https://rs-rest-kanban.herokuapp.com';
export const token = localStorage.getItem('token');
export const config = { headers: { Authorization: `Bearer ${token}` } };

export const path = {
  user: '/user',
  boards: '/boards',
  columns: '/columns',
};


export const fetchBoards = createAsyncThunk
// <IBoard[], { }>
(
  'boards/fetchBoards',

  async (_: void, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${BOARDS_URL}${path.boards}`, config);
      console.log(_);
      console.log('%cboardReducer.ts line:21 responseData', 'color: #007acc;', response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.log('%cboardReducer.ts line:27 object', 'color: #007acc;',  rejectWithValue(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (text: IBoard, { rejectWithValue, dispatch }) => {
    try {
      await axios
        .post(
          `${BOARDS_URL}${path.boards}`,
          {
            title: text.title,
            description: text.description,
          },
          config
        )
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
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${BOARDS_URL}${path.boards}/${id}`, config);
      dispatch(removeBoard({ id }));
      return {};
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state: IBoardsState, action) => {
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
    builder.addCase(fetchBoards.rejected, setError);
    builder.addCase(deleteBoard.rejected, setError);
  },
});

export default boardSlice.reducer;
const { createBoard, removeBoard } = boardSlice.actions;
