import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { loginAsync } from '../redux/users/userSlice';
import RegistrationForm from './RegistrationForm';
import PasswordForm from './passwords/forgotPassword';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const LoginPage = () => {
  const formRef = useRef();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.user.loginError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const form = Object.fromEntries(formData);
    const data = {
      user: { email: form.email, password: form.password },
    };

    dispatch(loginAsync(data)).then((result) => {
      if (result && result.error) return;
      navigate('/doctors');
    });
    e.target.reset();
  };

  return (
    <div className="container mt-5 bg-white card p-4">
      <form ref={formRef} onSubmit={handleSubmit} className="">
        <label htmlFor="email" className="form-label d-block mb-3">
          Email
          <input type="email" name="email" id="email" required placeholder="Email address" className="form-control form-control-lg" />
        </label>
        <label htmlFor="password" className="form-label d-block mb-3">
          Password
          <input type="password" name="password" id="password" required placeholder="Password" className="form-control form-control-lg" />
        </label>
        {error && <p className="text-danger">{error}</p>}
        <div className="d-grid">
          <input type="submit" value="Log in" className="btn btn-primary btn-lg" />
        </div>
      </form>
      <br />
      <button type="button" className="btn text-primary" data-bs-toggle="modal" data-bs-target="#forgotPassword">
        Forgotten password?
      </button>
      <div className="modal fade" id="forgotPassword" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Forgot your password?</h1>
              <button type="button" className="btn-close reset-password" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <PasswordForm />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <button type="button" className="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Create new account
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Sign up form</h1>
              <button type="button" className="btn-close create-new" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
