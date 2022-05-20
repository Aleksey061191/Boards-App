import React from 'react';
import SignUp from '../../components/signUp/SignUp';
import cl from './ProfilePage.module.scss';

function ProfilePage(): JSX.Element {
  return (
    <main className={cl.container}>
      <SignUp page="profile" />
    </main>
  );
}

export default ProfilePage;
