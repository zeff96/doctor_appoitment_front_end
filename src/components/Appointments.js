import { useEffect } from 'react';
import { fetchAppointments } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Appointments = () => {
  const appointments = useAppSelector((state) => state.doctors.appointments);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);
  return (
    <div className="pt-5">
      <h2 className="text-center mb-3">My Appointments</h2>
      <ul className="list-group appointments-container">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="list-group-item appointments-list">
            <div className="appointments-card">
              <div className="appointments-card-details">
                <h5>{appointment.doctor_name}</h5>
                <span className="d-block">{appointment.city}</span>
                <span>{appointment.date}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
