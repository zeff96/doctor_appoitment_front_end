import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', text: 'doctors' },
  { path: 'reservations', text: 'My reservations' },
  { path: 'doctors/new', text: 'Add doctor' },
  { path: 'doctors/delete', text: 'Delete doctor' },
];

const Navbar = () => (
  <nav className="navbar">
    <ul className="menuList">
      {links.map((link) => (
        <li className="listElement" key={link.text}>
          <NavLink
            to={link.path}
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          >
            {link.text}

          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
export default Navbar;
