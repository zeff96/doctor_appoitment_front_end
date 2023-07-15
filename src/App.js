import { Routes, Route } from 'react-router-dom';
import './App.css';
// import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
// import Reservations from './components/Reservations';
import NewDoctor from './Pages/NewDoctor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/doctors/new" element={<NewDoctor />} />
        {/* <Route path="reservations" element={<Reservations />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
