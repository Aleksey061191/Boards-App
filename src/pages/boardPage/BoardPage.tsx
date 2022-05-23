import React from 'react';
import { useParams } from 'react-router-dom';
import AddItemButton from '../../components/addItemButton/AddItemButton';
import Columns from '../../components/сolumns/Columns';

import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const { id } = useParams() as { id: string };
  console.log();
  return (
    <main className={cl.container}>
      <h1>Board Page {id}</h1>
      <AddItemButton itemType="Column" boardId={id} />
      <Columns boardId={id} />
    </main>
  );
}

export default BoardPage;
