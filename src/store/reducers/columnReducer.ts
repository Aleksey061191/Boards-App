import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { IColumn } from '../../components/columnItem/ColumnItem';
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
  async (boardId: string, { rejectWithValue }) => {
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

const setError = (state: IColumnsState, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (data: IColumn, { rejectWithValue, dispatch }) => {
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
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (data: IColumn, { dispatch, rejectWithValue }) => {
    const { id, boardId } = data;
    try {
      await axios.delete(`${BOARDS_URL}${path.boards}/${boardId}${path.columns}/${id}`, config);
      dispatch(removeColumn({ id }));
      return {};
    } catch (err) {
      const error = err as AxiosError;
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
    builder.addCase(fetchColumns.rejected, setError);
    builder.addCase(deleteColumn.rejected, setError);
  },
});

export default columnSlice.reducer;
const { createColumn, removeColumn } = columnSlice.actions;
