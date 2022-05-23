import React from 'react';
import { useParams } from 'react-router-dom';
import AddItemButton from '../../components/addItemButton/AddItemButton';
import Columns from '../../components/columns/Columns';

import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const { id } = useParams() as { id: string };

  return (
    <main className={cl.container}>
      <h1>Board Page {id}</h1>
      <AddItemButton itemType="Column" boardId={id} />
      <AddItemButton itemType="Task" />
      <Columns boardId={id} />
    </main>
  );
}

export default BoardPage;
