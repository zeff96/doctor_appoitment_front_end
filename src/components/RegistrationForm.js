import React, { useState } from 'react';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const implementform = (e) => {
    e.preventDefault();

    // const data = {
    //   name: document.getElementById('name'),
    //   email: document.getElementById('email'),
    //   confirmPassword: document.getElementById('confirmPassword'),
    // };

    // dispatch(createForm(data));
  };

  return (
    <form onSubmit={implementform}>
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="confirmPassword">
          password:
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm;
