import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/users/userSlice';
import '../styles.css';

const links = [
  { path: '/', text: 'doctors' },
  { path: 'appointment/new', text: 'Appointments form' },
  { path: 'appointments', text: 'My appointments' },
  { path: 'doctors/new', text: 'Add doctor' },
  { path: 'doctors/delete', text: 'Delete doctor' },
  { path: 'register', text: 'Register' },
];

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
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
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch(logoutAsync());
        }}
        >
          <button type="submit">logout</button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
