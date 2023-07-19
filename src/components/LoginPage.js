import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import logoImg from '../images/logo.png';

function LoginPage() {
//   const dispatch = useDispatch();
  const [inputPassword, setInputPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = {

  };

  return (
    <div className="login_body">
      <main className="login_main">
        <figure className="log_fig">
          <Link to="/">
            <img alt="img" src={logoImg} />
          </Link>
        </figure>
      </main>

      <form action="" className="login_form">
        <fieldset className="fieldset_border_none">
          <input className="input_name" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input_password" type={inputPassword} value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} required />
        </fieldset>

        <fieldset className="fieldset_border_none login_action">
          <button type="button" onClick={handleLogin}>Submit</button>
        </fieldset>

      </form>

    </div>
  );
}

export default LoginPage;
