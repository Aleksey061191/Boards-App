import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BoardItem from '../BoardItem/BoardItem';
import cl from './Boards.module.scss';
import type { IBoard } from '../BoardItem/BoardItem';

const Boards = () => {
  const boards = useSelector((state: RootState) => state.boards.boards);

  return (
    <div className={cl.container}>
      {boards.length
        ? boards.map((board: IBoard) => <BoardItem key={board.id} {...board} />)
        : null}
    </div>
  );
};

export default Boards;
