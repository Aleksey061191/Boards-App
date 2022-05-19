import React from 'react';
import { useParams } from 'react-router-dom';
import AddItem from '../../components/AddItem/AddItem';
import Columns from '../../components/Columns/Columns';
import cl from './BoardPage.module.scss';

function BoardPage(): JSX.Element {
  const params = useParams();

  return (
    <main className={cl.container}>
      <h1>Board Page {params.id}</h1>
      <AddItem itemType="Column" boardId={params.id}/>
      <AddItem itemType="Task" />
      <Columns />
    </main>
  );
}

export default BoardPage;
