import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { IColumn } from '../../components/ColumnItem/ColumnItem';
import { BOARDS_URL, config, path } from './boardReducer';

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
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BOARDS_URL}${path.boards}/${boardId}${path.columns}`,
        config
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await axios
        .post(
          `${BOARDS_URL}${path.boards}/${data.boardId}${path.columns}`,
          {
            title: data.title,
            order: data.order,
          },
          config
        )
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
  async (data, { dispatch, rejectWithValue }) => {
    const { id, board } = data;
    try {
      await axios.delete(`${BOARDS_URL}${path.boards}/${board}${path.columns}/${id}`, config);
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
const { createColumn, removeColumn } = columnSlice.actions;
