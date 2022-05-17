import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../hooks/appHooks';
import cl from './Header.module.scss';
import LanguageBtn from '../languageBtn/LanguageBtn';

function Header(): JSX.Element {
  const isAuth = useAppSelector((store) => store.user.isAuthorized);
  const location = useLocation();
  return (
    <header className={cl.container}>
      <div className={cl.mainPageHeader}>
        {location.pathname !== '/' && location.pathname !== '/auth' && isAuth && (
          <>
            <NavLink className={cl.headerLink} to="/">
              Welcome Page
            </NavLink>
            <Button variant="contained" className={`${cl.uiButn} ${cl.button}`}>
              New board
            </Button>
          </>
        )}
      </div>
      <div>
        {location.pathname === '/' && isAuth && (
          <NavLink className={cl.headerLink} to="/main">
            Go to Main Page
          </NavLink>
        )}
        {!isAuth && (
          <Button
            href={`${location.pathname !== '/auth' ? '/auth' : '/'}`}
            variant="contained"
            className={`${cl.uiButn} ${cl.button}`}
          >
            {location.pathname !== '/auth' ? 'Login' : 'Back'}
          </Button>
        )}

        <LanguageBtn />
      </div>
    </header>
  );
}

export default Header;
