import React from 'react';
import AddItem from '../../components/AddItem/AddItem';
import Boards from '../../components/Boards/Boards';
import cl from './MainPage.module.scss';

function MainPage(): JSX.Element {
  return (
    <main className={cl.container}>
      <AddItem itemType="Board" />
      <Boards />
    </main>
  );
}

export default MainPage;
