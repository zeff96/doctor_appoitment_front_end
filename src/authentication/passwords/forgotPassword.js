import { useRef } from 'react';
import { passwordResetAsync } from '../../redux/users/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const PasswordForm = () => {
  const formRef = useRef();

  const passwordError = useAppSelector((state) => state.user.passwordResetError);

  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const form = Object.fromEntries(formData);

    const data = {
      user: { email: form.email },
    };

    dispatch(passwordResetAsync(data)).then((result) => {
      if (result && result.error) return;
      const closeButton = document.querySelector('.reset-password');
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

export default PasswordForm;
