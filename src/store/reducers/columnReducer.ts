import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IColumn } from '../../components/ColumnItem/ColumnItem';
import { BOARDS_URL, path } from './boardReducer';

interface IColumnsState {
  columns: IColumn[];
  status: string | null;
  error: string | null;
}
const initialState: IColumnsState = {
  columns: [],
  status: null,
  error: null,
};

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BOARDS_URL}${path.columns}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (text, { rejectWithValue, dispatch }) => {
    console.log('%ccolumnReducer.ts line:33 text', 'color: #007acc;', text);
    try {
      await axios
        .post(`${BOARDS_URL}${path.columns}/`, {
          id: new Date().toISOString(),
          title: text.title,
          boardId: text.boardId
        })
        .then((response) => {
          dispatch(createColumn(response.data));
        });
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${BOARDS_URL}${path.columns}/${id}`);
      dispatch(removeColumn({ id }));
      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    createColumn(state, action) {
      state.columns.push(action.payload);
    },
    removeColumn(state, action) {
      console.log('%ccolumnReducer.ts line:52 remove me', 'color: #007acc;', 'remove me');
      state.columns = state.columns.filter((column: IColumn) => column.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchColumns.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.columns = action.payload;
    });
  },
});

export default columnSlice.reducer;
export const { createColumn, removeColumn } = columnSlice.actions;
