import * as React from 'react';
import produce from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import cl from './Columns.module.scss';
import { fetchColumns, updateColumn } from '../../store/reducers/helpers/columnHelpers';
import { ColumnItem, IColumn } from '../columnItem/ColumnItem';
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
    const newColumns = produce(columns, (draft) => {
      const dragged = draft[dragIndex];
      draft.splice(dragIndex, 1);
      draft.splice(hoverIndex, 0, dragged);
    });

    dispatch(updateColumn({ boardId, columnId, order: hoverIndex + 1, title }));
    dispatch(changeColumns(newColumns));
  };

  return (
    <div className={cl.container}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {columns.map((column: IColumn, indexColumn) => (
        <ColumnItem
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
