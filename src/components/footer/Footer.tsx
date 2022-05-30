import React from 'react';
import { useTranslation } from 'react-i18next';
import cl from './Footer.module.scss';
import logoRs from '../../assets/svg/rss.svg';

function Footer(): JSX.Element {
  const { t } = useTranslation();
  return (
    <footer className={cl.footer}>
      <div className={cl.containerFooter}>
        <a href="https://rs.school/react/">
          <img className={cl.iconRs} src={logoRs} alt="Rsschool Icon" width="73" height="26" />
        </a>
        <div className={cl.developer}>
          <a
            className={cl.github}
            href="https://github.com/Aleksey061191"
            target="_blank"
            rel="noreferrer"
          >
            <p>{t('Aliaksei Makarenka')}</p>
          </a>
          <a
            className={cl.github}
            href="https://github.com/makhitr"
            target="_blank"
            rel="noreferrer"
          >
            <p>{t('Marina Khitrovo')}</p>
          </a>
          <a
            className={cl.github}
            href="https://github.com/lena-r-a"
            target="_blank"
            rel="noreferrer"
          >
            <p>{t('Alena Ryzhankova')}</p>
          </a>
        </div>
        <p className={cl.year}>2022</p>
      </div>
    </footer>
  );
}

export default Footer;
