import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Details from './components/Details';
// import Reservations from './components/Reservations';
import NewDoctor from './Pages/NewDoctor';
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/doctors/new" element={<NewDoctor />} />
        <Route path=":id" element={<Details />} />
        {/* <Route path="reservations" element={<Reservations />} /> */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
