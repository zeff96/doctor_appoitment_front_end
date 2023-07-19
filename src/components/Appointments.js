import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../redux/doctors/doctorSlice';

function Appointments() {
  const appointments = useSelector((state) => state.doctors.appointments); // Update the selector
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div>
      <ul className="appointments-container">
        {appointments.map((appointment) => (
          <li key={appointments.id} className="appointments-list">
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
