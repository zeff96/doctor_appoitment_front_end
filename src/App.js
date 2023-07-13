import { Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import Home from './components/Home';
// import Reservations from './components/Reservations';

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="reservations" element={<Reservations />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
