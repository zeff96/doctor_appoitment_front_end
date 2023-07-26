import { useEffect } from 'react';
import { fetchAppointments } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

function Appointments() {
  const appointments = useAppSelector((state) => state.doctors.appointments); // Update the selector
  const user = useAppSelector((state) => state.user.userData.user); // Update the selector
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAppointments(JSON.parse(user).id));
  }, [dispatch], user);
  return (
    <div>
      <ul className="list- group appointments-container">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="list-group-item appointments-list">
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
