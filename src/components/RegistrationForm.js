import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { signUpAsync } from '../redux/users/userSlice';

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
    <form ref={formRef} onSubmit={implementform}>
      <div>
        <label htmlFor="name">
          Name:
          <input
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
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm;
