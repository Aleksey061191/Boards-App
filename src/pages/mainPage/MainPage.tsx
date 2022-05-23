import React from 'react';
import Boards from '../../components/Boards/Boards';
import cl from './MainPage.module.scss';

function MainPage(): JSX.Element {
  return (
    <main className={cl.container}>
      <Boards />
    </main>
  );
}

export default MainPage;
