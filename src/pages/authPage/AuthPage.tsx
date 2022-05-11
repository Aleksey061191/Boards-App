import React from 'react';
import cl from './AuthPage.module.scss';

function AuthPage(): JSX.Element {
  return (
    <main className={cl.container} data-testid="about-page">
      <h1>Sign In/Up</h1>
    </main>
  );
}

export default AuthPage;
