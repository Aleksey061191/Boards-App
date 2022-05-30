import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
      <h5 className={cl.title}>Board {board.title}</h5>
      <DndProvider backend={HTML5Backend}>
        <AddItemButton itemType="Column" boardId={id} />
        <Columns boardId={id} />
      </DndProvider>
    </main>
  );
}

export default BoardPage;
