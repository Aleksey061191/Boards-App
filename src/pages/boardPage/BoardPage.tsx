import React from 'react';
import { useParams } from 'react-router-dom';
import AddItemButton from '../../components/addItemButton/AddItemButton';
import Columns from '../../components/columns/Columns';
import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const params = useParams();

  return (
    <main className={cl.container}>
      <h1>Board Page {params.id}</h1>
      <AddItemButton itemType="Column" boardId={params.id} />
      <AddItemButton itemType="Task" />
      <Columns boardId={params.id} />
    </main>
  );
}

export default BoardPage;
