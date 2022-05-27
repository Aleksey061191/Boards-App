import React from 'react';
import { useTranslation } from 'react-i18next';
import Team from '../../components/team/Team';
import cl from './WelcomePage.module.scss';
import '../../utils/i18next';

function WelcomePage(): JSX.Element {
  const { t } = useTranslation();
  return (
    <main className={cl.container}>
      <h2 className={cl.course}>{t('course_name')}</h2>
      <h3 className={cl.project}>{t('project')}</h3>
      <h2 className={cl.teamTitle}>{t('team')}</h2>
      <Team />
    </main>
  );
}

export default WelcomePage;
