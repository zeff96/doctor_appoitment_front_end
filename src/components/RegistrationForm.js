import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signUpAsync } from '../redux/users/userSlice';
import resgister from '../images/register.png';

function RegistrationForm() {
  const formRef = useRef();
  const dispatch = useDispatch();

  const implementform = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const form = Object.fromEntries(formData);

    const data = {
      user: {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      },
    };

    dispatch(signUpAsync(data));
  };

  return (
    <div className="d-flex flex-row">

      <div className="p-2">
        <h1>Sign Up Form</h1>
        <img src={resgister} className="img-thumbnail" alt="img" />
      </div>

      <form ref={formRef} onSubmit={implementform}>
        <div>
          <label htmlFor="name">
            Name:
            <input
              className="form-control form-control-lg"
              type="text"
              name="name"
              id="name"
            />
          </label>
        </div>

        <div>
          <label htmlFor="email">
            Email:
            <input
              className="form-control form-control-lg"
              type="email"
              name="email"
              id="email"
            />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            password:
            <input
              className="form-control form-control-lg"
              type="password"
              name="password"
              id="password"
            />
          </label>
        </div>

        <div>
          <label htmlFor="confirmPassword">
            password:
            <input
              className="form-control form-control-lg"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
            />
          </label>
        </div>

        <button className="btn btn-primary" type="submit">Create account</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
