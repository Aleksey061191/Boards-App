import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../hooks/appHooks';
import UserMenu from '../userMenu/UserMenu';
import cl from './Header.module.scss';
import LanguageBtn from '../languageBtn/LanguageBtn';
import AddItemButton from '../addItemButton/AddItemButton';

function Header(): JSX.Element {
  const { t } = useTranslation();
  const isAuth = useAppSelector((store) => store.user.isAuthorized);
  const location = useLocation();
  return (
    <header className={cl.container}>
      <div className={cl.mainPageHeader}>
        {location.pathname !== '/' && (
          <>
            <NavLink className={cl.headerLink} to="/">
              {t('wel_page')}
            </NavLink>
            {location.pathname !== '/' &&
              location.pathname !== '/main' &&
              location.pathname !== '/auth' && (
                <NavLink className={`${cl.headerLink} ${cl.mainPageLink}`} to="/main">
                  {t('main_page')}
                </NavLink>
              )}
            {location.pathname === '/main' && (
              <AddItemButton itemType="Board" className={`${cl.uiButn} ${cl.button}`} />
            )}
          </>
        )}
      </div>
      <div className={cl.profileContainer}>
        {isAuth && location.pathname === '/' && (
          <NavLink className={cl.headerLink} to="/main">
            {t('to_main_page')}
          </NavLink>
        )}
        {!isAuth && location.pathname !== '/auth' && (
          <NavLink className={cl.headerLink} to="/auth">
            <Button variant="contained" className={`${cl.uiButn} ${cl.button}`}>
              {t('login')}
            </Button>
          </NavLink>
        )}
        {isAuth && <UserMenu />}
        <LanguageBtn />
      </div>
    </header>
  );
}

export default Header;
