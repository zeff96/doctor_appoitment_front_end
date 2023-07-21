import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplashPage from './components/SplashPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <ProtectedRoute path="/home" element={<Home />} />
        <Route path="/signup" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}
export default App;
