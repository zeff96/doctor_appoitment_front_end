import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAsync } from '../redux/users/userSlice';

function RegistrationForm() {
  const authError = useSelector((state) => state.user.signError);
  const [error, setError] = useState('');
  const [mismatch, setMismatch] = useState(' ');
  const formRef = useRef();
  const dispatch = useDispatch();
  const MINIMUM_PASSWORD_LENGTH = 6;

  const implementform = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const form = Object.fromEntries(formData);

    if (form.password.length < MINIMUM_PASSWORD_LENGTH) {
      setError(`Password must be atleast ${MINIMUM_PASSWORD_LENGTH} characters!`);
      return;
    }

    if (form.password !== form.password_confirmation) {
      setMismatch('Password do not match!');
      return;
    }

    setError('');
    setMismatch('');

    const data = {
      user: {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      },
    };

    dispatch(signUpAsync(data)).then((result) => {
      if (result && result.error) return;
      const closeButton = document.querySelector('.btn-close');
      if (closeButton) {
        closeButton.click();
      }
    });
    e.target.reset();
  };

  return (
    <form ref={formRef} onSubmit={implementform} className="form">
      <label htmlFor="name" className="form-label d-block mb-3">
        Name
        <input
          className="form-control form-control-lg"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
      </label>

      <label htmlFor="email" className="form-label d-block mb-3">
        Email
        <input
          className="form-control form-control-lg"
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          required
        />
        {authError && <span className="text-danger">{authError}</span>}
      </label>

      <label htmlFor="password" className="form-label d-block mb-3">
        Password
        {' '}
        (
        {' '}
        <em>
          Minimum length
          {' '}
          {MINIMUM_PASSWORD_LENGTH}
          {' '}
          characters
        </em>
        {' '}
        )
        <input
          className="form-control form-control-lg"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        {error && <span className="text-danger">{error}</span>}
      </label>

      <label htmlFor="password_confirmation" className="form-label d-block mb-3">
        Confirm password
        <input
          className="form-control form-control-lg"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="Password confirmation"
          required
        />
        {mismatch && <span className="text-danger">{mismatch}</span>}
      </label>
      <div className="d-flex justify-content-center">
        <button className="btn btn-success d-inline-block" type="submit">Create account</button>
      </div>
    </form>
  );
}

export default RegistrationForm;
