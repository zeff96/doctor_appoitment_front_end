import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/users/userSlice';

const links = [
  { path: '/doctors', text: 'doctors' },
  { path: '/doctors/new_appointment', text: 'Appointments form' },
  { path: '/doctors/appointments', text: 'My appointments' },
  { path: 'doctors/new', text: 'Add doctor' },
  { path: 'doctors/delete', text: 'Delete doctor' },
  { path: 'register', text: 'Register' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((link) => (
                <li className="nav-item py-2 ps-2" key={link.text}>
                  <NavLink
                    to={link.path}
                    className="nav-link"
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
          dispatch(logoutAsync()).then(() => {
            navigate('/');
          });
        }}
        >
          <button type="submit">logout</button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
