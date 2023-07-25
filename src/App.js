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
import Layout from './components/Layout';
import Details from './components/Details';
import Appointments from './components/Appointments';
import NewAppointment from './components/NewAppointment';
import NewPasswordForm from './authentication/passwords/newPassword';
import NewDoctor from './Pages/NewDoctor';
import DeleteDoctor from './components/delete';

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
        <Route path="/reset_password/edit" element={<NewPasswordForm />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/doctors/" element={<Layout />}>
            <Route exact path="/doctors/" element={<Doctors />} />
            <Route exact path="/doctors/:id" element={<Details />} />
            <Route exact path="/doctors/appointments" element={<Appointments />} />
            <Route exact path="/doctors/new_appointment" element={<NewAppointment />} />
            <Route exact path="/doctors/new" element={<NewDoctor />} />
            <Route exact path="/doctors/delete" element={<DeleteDoctor />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
