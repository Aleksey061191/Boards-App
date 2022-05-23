import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ColumnItem } from '../columnItem/ColumnItem';
import type { IColumn } from '../columnItem/ColumnItem';
import { fetchColumns } from '../../store/reducers/columnReducer';
import columnsApi from '../../services/columnsApi';
import cl from './Columns.module.scss';

interface ColumnsProps {
  boardId: string;
}

const Columns: React.FC<ColumnsProps> = ({ boardId }) => {
  const columns = useSelector((state: RootState) => state.columns.columns);
  const { status, error } = useSelector((state: RootState) => state.columns);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchColumns(boardId));
  }, [dispatch, boardId]);

  return (
    <div className={cl.container}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {columns.map((column: IColumn) => (
        <ColumnItem key={column.id} {...column} boardId={boardId} />
      ))}
    </div>
  );
};

export default Columns;
