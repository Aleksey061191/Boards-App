import React from 'react';
import AddBoard from '../../components/AddBoard/AddBoard';
import Boards from '../../components/Boards/Boards';
import cl from './MainPage.module.scss';

function MainPage(): JSX.Element {
  return (
    <main className={cl.container}>
      <AddBoard />
      <Boards />
    </main>
  );
}

export default MainPage;
