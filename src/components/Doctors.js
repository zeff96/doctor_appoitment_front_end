import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { BiLogoYoutube } from 'react-icons/im';
import { BiLogoYoutube, BiLogoFacebookSquare, BiLogoInstagram } from 'react-icons/bi';
import { fechDoctors } from '../redux/doctors/doctorSlice';
import Navbar from './Navbar';
import '../css/Home.css';

const Doctors = () => {
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fechDoctors());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1> LAST MODEL </h1>
      <div className="card-group">
        <div className="card">
          <ul className="doctors-container">
            {doctors.map((doctor) => (
              <li key={doctor.id} className="doctors-list">
                <button
                  className="doctors-card"
                  type="button"
                  onClick={() => {
                    navigate(`${doctor.id}`);
                  }}
                >
                  <div className="circle-color">
                    <img src={doctor.image_url} alt={doctor.name} className="rounded-circle w-50 h-20 blob" width="2" />
                  </div>
                  <div className="doctors-card-details">
                    <h5>{doctor.name}</h5>
                    <p className="dots2">..............................</p>
                    <p className="doctors-details">
                      {doctor.bio}
                    </p>
                  </div>
                  <BiLogoYoutube />
                  <BiLogoFacebookSquare />
                  <BiLogoInstagram />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
