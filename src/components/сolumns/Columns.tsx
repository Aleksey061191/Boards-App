import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import cl from './Columns.module.scss';
import { fetchColumns, updateColumn } from '../../store/reducers/helpers/columnHelpers';
import ColumnsItem, { IColumn } from '../columnItem/ColumnItem';
import { changeColumns } from '../../store/reducers/columnReducer';

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

  const moveColumn = (dragIndex: number, hoverIndex: number, columnId: string, title: string) => {
    const column = columns[dragIndex];
    const newColumns = columns.slice();
    newColumns.splice(dragIndex, 1);
    newColumns.splice(hoverIndex, 0, column);

    dispatch(updateColumn({ boardId, columnId, title, order: hoverIndex + 1 }));
    dispatch(changeColumns(newColumns));
  };

  return (
    <div className={cl.container}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {columns.map((column: IColumn, indexColumn) => (
        <ColumnsItem
          key={column.id}
          {...column}
          boardId={boardId}
          indexColumn={indexColumn}
          moveColumn={moveColumn}
        />
      ))}
    </div>
  );
};

export default Columns;
