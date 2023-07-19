import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Details from './components/Details';
import AppointmentForm from './components/NewAppointment';
import Appointments from './components/Appointments';
import NewDoctor from './Pages/NewDoctor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/doctors/new" element={<NewDoctor />} />
        <Route path="/doctors/:id" element={<Details />} />
        <Route path="/appointment/new" element={<AppointmentForm />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>
    </Routes>
  );
}

export default App;
