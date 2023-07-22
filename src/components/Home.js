import { Routes, Route } from 'react-router-dom';
import NewAppointment from './NewAppointment';
import Appointments from './Appointments';
import Doctors from './Doctors';
import HomeNavbar from './Navbar';

function Home() {
  return (

    <div>
      <HomeNavbar />
      <Routes>
        <Route path="/" element={<Doctors />} />
        <Route path="appointment/new" element={<NewAppointment />} />
        <Route path="appointments" element={<Appointments />} />
      </Routes>
    </div>
  );
}

export default Home;
