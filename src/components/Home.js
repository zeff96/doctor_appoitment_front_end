import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fechDoctors } from '../redux/doctors/doctorSlice';

function Greeting() {
  const doctors = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fechDoctors());
  }, [dispatch]);

  return (
    <div>
      <ul className="doctors-container">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="doctors-list">
            <div className="doctors-card">
              <div className="circle-color">
                <img src={doctor.image_url} alt={doctor.name} className="doctors-image" />
              </div>
              <div className="doctors-card-details">
                <h5>{doctor.name}</h5>
                <p className="dots2">..............................</p>
                <p className="doctors-details">
                  {doctor.bio}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Greeting;
