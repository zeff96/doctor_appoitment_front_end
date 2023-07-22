import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import SplashPage from './components/SplashPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route element={<ProtectedRoute token={isAuthenticated} />}>
          <Route path="/home/*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
