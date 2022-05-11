import React from 'react';
import { TEXT_NOT_FOUND_PAGE } from '../../constants/const';
import cl from './NotFound.module.scss';

function NotFound(): JSX.Element {
  return (
    <main className={cl.container}>
      <h1>404</h1>
      <p>{TEXT_NOT_FOUND_PAGE}</p>
    </main>
  );
}

export default NotFound;
