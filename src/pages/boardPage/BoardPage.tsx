import React from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddItemButton from '../../components/addItemButton/AddItemButton';
import Columns from '../../components/сolumns/Columns';

import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const { id } = useParams() as { id: string };
  return (
    <main className={cl.container}>
      <DndProvider backend={HTML5Backend}>
        <AddItemButton itemType="Column" boardId={id} />
        <Columns boardId={id} />
      </DndProvider>
    </main>
  );
}

export default BoardPage;
