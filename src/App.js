import { BrowserRouter as Routes, Route } from 'react-router-dom';
import './App.css';
// import { useEffect, useState } from 'react';
// import LoginForm from './components/LoginPage';
import SplashPage from './components/SplashPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import Layout from './components/Layout';
import Home from './components/Home';
import Details from './components/Details';
// import Reservations from './components/Reservations';
// import NewDoctor from './Pages/NewDoctor';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';

function App() {
  // const isAuthenticated = localStorage.getItem('token');
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   setToken(isAuthenticated);
  // }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<SplashPage />}>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route index element={<Home />} />
        {/* <Route path="/doctors/new" element={<NewDoctor />} /> */}
        <Route path=":id" element={<Details />} />
        {/* <Route element={<ProtectedRoute token={token} />} /> */}
        {/* <Route path="reservations" element={<Reservations />} /> */}
        <Route path="/register" element={<RegistrationForm />} />
      </Route>
    </Routes>
  );
}

export default App;
