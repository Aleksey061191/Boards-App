import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Sticky from '../components/Sticky/Sticky';

function Root(): JSX.Element {
  return (
    <>
      <Sticky>
        <Header />
      </Sticky>
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
