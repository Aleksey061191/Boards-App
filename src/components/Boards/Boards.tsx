import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import BoardItem from '../BoardItem/BoardItem';
import type { IBoard } from '../BoardItem/BoardItem';
import cl from './Boards.module.scss';
import { fetchBoards } from '../../store/reducers/helpers/boardHelpers';

const Boards = () => {
  const boards = useSelector((state: RootState) => state.boards.boards);
  const { status, error } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <div className={cl.container}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {boards.map((board: IBoard) => (
        <BoardItem key={board.id} {...board} />
      ))}
    </div>
  );
};

export default Boards;
