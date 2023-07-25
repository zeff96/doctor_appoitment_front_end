import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../redux/doctors/doctorSlice';

function Appointments() {
  const appointments = useSelector((state) => state.doctors.appointments); // Update the selector
  const user = useSelector((state) => state.user.userData.user); // Update the selector
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppointments(JSON.parse(user).id));
  }, [dispatch], user);
  return (
    <div>
      <ul className="appointments-container">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="appointments-list">
            <div className="appointments-card">
              <div className="appointments-card-details">
                <h5>{appointment.doctor}</h5>
                <p>{appointment.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
