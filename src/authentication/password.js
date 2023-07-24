import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetAsync, passwordResetNewAsync } from '../redux/users/userSlice';

const PasswordForm = () => {
  const formRef = useRef();

  const passwordError = useSelector((state) => state.user.passwordResetError);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const form = Object.fromEntries(formData);

    const data = {
      user: { email: form.email },
    };

    dispatch(passwordResetAsync(data)).then((result) => {
      if (result && result.error) return;
      const closeButton = document.querySelector('.btn-close');
      if (closeButton) {
        closeButton.click();
      }
    });
  };

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit}>
      <label htmlFor="email" className="form-label d-block mb-3">
        Email
        <input type="email" name="email" id="email" placeholder="Email address" required className="form-control" />
        {passwordError && <span className="text-danger">{passwordError}</span>}
      </label>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-sm">Send me reset password instructions</button>
      </div>
    </form>
  );
};

export const NewPassword = () => {
  const [error, setError] = useState('');
  const formRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const form = Object.fromEntries(formData);

    if (form.password !== form.password_confirmation) {
      setError('Password do not match!');
      return;
    }

    setError('');

    const data = {
      user: {
        password: form.password,
        password_confirmation: form.password_confirmation,
        reset_password_token: 'rdSwgC6psjKL21tzofii',
      },
    };

    dispatch(passwordResetNewAsync(data));

    e.target.reset();
  };

  return (
    <form ref={formRef} className="form container p-3" onSubmit={handleSubmit}>
      <label htmlFor="newPassword" className="form-label d-block mb-3">
        New password
        <input type="password" name="password" id="newPassword" required placeholder="password" className="form-control" />
      </label>
      <label htmlFor="password" className="form-label d-block mb-3">
        Confirm password
        <input type="password" name="password_confirmation" id="confirmPassword" required placeholder="password" className="form-control" />
        {error && <span>{error}</span>}
      </label>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default PasswordForm;
