import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/users/userSlice';

const links = [
  { path: '/doctors', text: 'DOCTORS' },
  { path: '/doctors/new_appointment', text: 'ADD APPOINTMENT' },
  { path: '/doctors/appointments', text: 'MY APPOINTMENTS' },
  { path: 'doctors/new', text: 'ADD DOCTOR' },
  { path: 'doctors/delete', text: 'DELETE DOCTOR' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="row side-bar">
      <nav className="navbar navbar-expand bg-light col collapse collapse-horizontal flex-column" id="collapseElement">
        <div className="collapse-header mb-5">
          <h5 className="collapse-title h3 my-5">Doctor Appointment</h5>
        </div>
        <div className="collapse-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 row">
            {links.map((link) => (
              <li className="nav-item py-2 ps-2 col-12" key={link.text}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'd-flex bg-info text-light text-decoration-none h6 py-2 ms-4 ps-3 pe-auto my-0 fw-bold' : 'd-flex text-dark text-decoration-none h6 py-2 ms-4 ps-3 pe-auto my-0 fw-bold btn btn-outline-info')}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <ul className="d-flex mt-auto">
          <a href="https://www.twitter.com" aria-label="Twitter"><i className="bi bi-twitter p-1 mx-2 h5" /></a>
          <a href="https://www.facebook.com" aria-label="Facebook"><i className="bi bi-facebook p-1 mx-2 h5" /></a>
          <a href="https://www.google.com" aria-label="Facebook"><i className="bi bi-google p-1 text-success mx-2 h5" /></a>
          <a href="https://www.linkedin.com" aria-label="Facebook"><i className="bi bi-linkedin p-1 mx-2 h5" /></a>
          <a href="https://www.vimeo.com" aria-label="Facebook"><i className="bi bi-vimeo p-1 mx-2 h5" /></a>
          <a href="https://www.pinterest.com" aria-label="Facebook"><i className="bi bi-pinterest p-1 text-danger mx-2 h5" /></a>
        </ul>
        <hr className="mt-3" />
        <form
          className="d-flex align-self-start ms-4 mb-5"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(logoutAsync()).then(() => {
              navigate('/');
            });
          }}
        >
          <button className="btn btn-outline-danger" type="submit">logout</button>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
