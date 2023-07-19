import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css';

const links = [
  { path: '/', text: 'doctors' },
  { path: 'appointment/new', text: 'Appointments form' },
  { path: 'appointments', text: 'My appointments' },
  { path: 'doctors/new', text: 'Add doctor' },
  { path: 'doctors/delete', text: 'Delete doctor' },
];

const Navbar = () => (
  <div className="row side-bar">
    <nav className="navbar navbar-expand-lg bg-light col collapse collapse-horizontal" id="collapseExample">
      <div className="container-fluid">
        <h1 className="h3 my-5">Doctor appointment</h1>
        <div className=" mt-5 container-fluid ms-0">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 menuList">
            {links.map((link) => (
              <li className="nav-item py-2 ps-2 listElement" key={link.text}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'active-link text-light' : undefined)}
                >
                  {link.text}

                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    <button id="menu-btn" className="btn btn-primary col-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      M
      <span className="arrow" />
    </button>
  </div>
);
export default Navbar;
