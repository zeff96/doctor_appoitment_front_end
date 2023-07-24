import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SplashPage from './components/SplashPage';
import ProtectedRoute from './components/ProtectedRoute';
import { loginAsync } from './redux/users/userSlice';
import Doctors from './components/Doctors';
import NewPassword from './authentication/passwords/newPassword';

function App() {
  const token = Cookies.get('jwt_token');
  const userData = Cookies.get('user_info');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userData) {
      const user = JSON.parse(userData);

      dispatch(loginAsync.fulfilled({ user }));
    }
  }, [dispatch, token, userData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/reset_password/edit" element={<NewPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/doctors/" element={<Doctors />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
