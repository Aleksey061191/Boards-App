import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cl from './Header.module.scss';

function Header(): JSX.Element {
  const navigate = useNavigate();

  return (
    <header className={cl.container}>
      <NavLink className={cl.headerLink} to="/main">
        Main
      </NavLink>
      <NavLink className={cl.headerLink} to="/board">
        Board
      </NavLink>
      <button className={cl.headerLink} onClick={() => navigate(`/sign/in`)}>
        Sign In
      </button>
      <button className={cl.headerLink} onClick={() => navigate(`/sign/up`)}>
        Sign Up
      </button>
    </header>
  );
}

export default Header;
