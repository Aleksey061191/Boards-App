import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddItemButton from '../../components/addItemButton/AddItemButton';
import type { IBoard } from '../../components/BoardItem/BoardItem';
import Columns from '../../components/сolumns/Columns';
import { RootState } from '../../store/store';

import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const { id } = useParams() as { id: string };
  const boards = useSelector((state: RootState) => state.boards.boards);
  const board = boards.find((item) => item.id === id) as IBoard;
  return (
    <main className={cl.container}>
      <h5>Board {board.title}</h5>
      <AddItemButton itemType="Column" boardId={id} />
      <Columns boardId={id} />
    </main>
  );
}

export default BoardPage;
