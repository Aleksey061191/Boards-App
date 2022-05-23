import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { IColumn } from '../../components/columnItem/ColumnItem';
import columnsApi, { ICreateColumnParams, IDeleteColumnParams } from '../../services/columnsApi';

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
      const response = await columnsApi.getAllColumns(boardId);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async (data: ICreateColumnParams, { rejectWithValue, dispatch }) => {
    const { boardId, title } = data;
    try {
      await columnsApi.createColumn(boardId, { title }).then((response) => {
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
  async (data: IDeleteColumnParams, { dispatch, rejectWithValue }) => {
    const { id, boardId } = data;
    try {
      await columnsApi.deleteColumn(boardId, id);
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
    builder.addCase(fetchColumns.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
    builder.addCase(deleteColumn.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
  },
});

export default columnSlice.reducer;
const { createColumn, removeColumn } = columnSlice.actions;
