import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ColumnItem } from '../ColumnItem/ColumnItem';
import type { IColumn } from '../ColumnItem/ColumnItem';
import { fetchColumns } from '../../store/reducers/columnReducer';
import cl from './Columns.module.scss';


const Columns = () => {
  const columns = useSelector((state: RootState) => state.columns.columns);
  const { status, error } = useSelector((state: RootState) => state.columns);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchColumns());
  }, [dispatch]);

  return (
    <div className={cl.container} >
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {columns.map((column: IColumn ) => (
        <ColumnItem key={column.id} {...column} />
      ))}
    </div>
  );
};

export default Columns;
