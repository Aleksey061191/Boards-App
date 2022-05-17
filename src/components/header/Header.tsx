import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/appHooks';
import UserMenu from '../userMenu/UserMenu';
import cl from './Header.module.scss';

function Header(): JSX.Element {
  const isAuth = useAppSelector((store) => store.user.isAuthorized);

  return (
    <header className={cl.container}>
      {isAuth && (
        <>
          <NavLink className={cl.headerLink} to="/main">
            Go to Main Page
          </NavLink>
          <NavLink className={cl.headerLink} to="/board">
            Board
          </NavLink>
        </>
      )}
      {!isAuth && (
        <NavLink className={cl.headerLink} to="/auth">
          Authorization
        </NavLink>
      )}
      {isAuth && <UserMenu />}
    </header>
  );
}

export default Header;
