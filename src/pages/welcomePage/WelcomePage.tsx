import React from 'react';
import Team from '../../components/team/Team';
import cl from './WelcomePage.module.scss';

function WelcomePage(): JSX.Element {
  return (
    <main className={cl.container}>
      <h2 className={cl.course}>Online course "Development on React"</h2>
      <h3 className={cl.project}>
        A project management system is an application that helps an individual in a team or a group
        of developers achieve their goals.
      </h3>
      <h2 className={cl.teamTitle}>Our team</h2>
      <Team />
    </main>
  );
}

export default WelcomePage;
