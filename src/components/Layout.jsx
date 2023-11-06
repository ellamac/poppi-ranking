import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBarTop from './NavBarTop';
const Layout = (props) => {
  return (
    <>
      <NavBarTop />

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
