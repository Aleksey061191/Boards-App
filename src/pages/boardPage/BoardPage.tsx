import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddItemButton from '../../components/addItemButton/AddItemButton';
import Columns from '../../components/сolumns/Columns';
import { fetchBoards, getBoard } from '../../store/reducers/helpers/boardHelpers';
import { AppDispatch, RootState } from '../../store/store';

import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const { id } = useParams() as { id: string };
  const board = useSelector((state: RootState) => state.boards.selectedBoard);

  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchBoards());
    dispatch(getBoard({ id }));
  }, [dispatch, id]);

  return (
    <main className={cl.container}>
      <h5>Board {board.title}</h5>
      <AddItemButton itemType="Column" boardId={id} />
      <Columns boardId={id} />
    </main>
  );
}

export default BoardPage;
