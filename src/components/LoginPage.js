import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { loginAsync } from '../redux/users/userSlice';
import '../css/LoginPage.css';
import doctors from '../images/doctorApp.jpg';

function LoginPage() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const form = Object.fromEntries(formData);
    const data = {
      user: { email: form.email, password: form.password },
    };

    dispatch(loginAsync(data)).then((result) => {
      if (result.payload === undefined) return;
      navigate('/home');
    });
    e.target.reset();
  }

  return (
    <div className="div-container">
      <div className="image-wrapper">
        <img src={doctors} className="img-thumbnail" alt="img" />
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="">
        <input type="email" name="email" id="email" required placeholder="email" className="form-control form-control-lg" />
        <br />
        <input type="password" name="password" id="password" required placeholder="password" className="form-control form-control-lg" />
        <br />
        <input type="submit" value="Log in" className="btn btn-primary" />
        <br />
      </form>
      <div className="navLink">
        Not a user?
        <NavLink to="/signup" className="btn btn-primary">Sign up</NavLink>
      </div>
    </div>
  );
}

export default LoginPage;
