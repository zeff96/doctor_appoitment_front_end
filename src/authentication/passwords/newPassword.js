import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordResetNewAsync } from '../../redux/users/userSlice';
import { useAppDispatch } from '../../hooks/hooks';

const NewPasswordForm = () => {
  const [error, setError] = useState('');
  const formRef = useRef();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getResetToken = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const resetToken = url.searchParams.get('reset_password_token');

    return resetToken;
  };

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
        reset_password_token: getResetToken(),
      },
    };

    dispatch(passwordResetNewAsync(data)).then((result) => {
      if (result && result.error) return;
      navigate('/');
    });

    e.target.reset();
  };

  return (
    <form ref={formRef} className="form container p-3" onSubmit={handleSubmit}>
      <h1 className="text-center fw-bold">Change your password</h1>
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

export default NewPasswordForm;
