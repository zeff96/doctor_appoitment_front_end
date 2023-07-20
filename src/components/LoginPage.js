import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { loginAsync } from '../redux/users/userSlice';
import '../css/LoginPage.css';

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
      navigate('/doctors');
    });
    e.target.reset();
  }

  return (
    <div className="div-container">
      <form ref={formRef} onSubmit={handleSubmit} className="">
        <input type="email" name="email" id="email" required placeholder="email" className="" />
        <input type="password" name="password" id="password" required placeholder="password" className="" />
        <input type="submit" value="Log in" className="btn btn-primary" />
      </form>
      <div>
        Not a user?
        <NavLink to="/signup">Sign up</NavLink>
      </div>
    </div>
  );
}

export default LoginPage;
