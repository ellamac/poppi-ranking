import React, { useState, useEffect } from 'react';
import { lastFriday } from '../helpers/dates';
import { Link, NavLink } from 'react-router-dom';
import '../styles/navbars.css';

const NavBarTop = (props) => {
  const navlinkClass = (isActive, isPending) => {
    return isPending
      ? 'navlink pending'
      : isActive
      ? 'navlink active'
      : 'navlink';
  };

  return (
    <header className='navbar top'>
      <NavLink
        className={({ isActive, isPending }) =>
          navlinkClass(isActive, isPending)
        }
        to={`/vote`}
      >
        Äänestä
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          navlinkClass(isActive, isPending)
        }
        to='/'
      >
        kotiin
      </NavLink>
    </header>
  );
};

export default NavBarTop;
