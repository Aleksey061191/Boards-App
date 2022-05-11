import React from 'react';
import cl from './Footer.module.scss';
import logoRs from '../../assets/svg/rss.svg';

function Footer(): JSX.Element {
  return (
    <footer className={cl.footer}>
      <div className={cl.containerFooter}>
        <a href="https://rs.school/react/">
          <img className={cl.iconRs} src={logoRs} alt="Rsschool Icon" width="73" height="26" />
        </a>
        <div className={cl.developer}>
          <a className={cl.github} href="https://github.com/Aleksey061191">
            <p>Aliaksei Makarenka</p>
          </a>
          <a className={cl.github} href="https://github.com/makhitr">
            <p>Marina Khitrovo</p>
          </a>
          <a className={cl.github} href="https://github.com/lena-r-a">
            <p>Alena Ryzhankova</p>
          </a>
        </div>
        <div className={cl.yearContainer}>
          <p className={cl.copyright}>©</p>
          <p className={cl.year}>2022</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
