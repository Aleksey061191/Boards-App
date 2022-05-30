import { createSlice } from '@reduxjs/toolkit';
import type { IColumn } from '../../components/columnItem/ColumnItem';
import { addColumn, deleteColumn, fetchColumns } from './helpers/columnHelpers';

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

const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    changeColumns(state, action) {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addColumn.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.columns.push(action.payload);
    });
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
    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      state.columns = state.columns.filter((column: IColumn) => column.id !== action.payload.id);
    });
  },
});

export const { changeColumns } = columnSlice.actions;
export default columnSlice.reducer;
