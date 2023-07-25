import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetAsync } from '../../redux/users/userSlice';

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

export default PasswordForm;
