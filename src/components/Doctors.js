import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fechDoctors } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Doctors = () => {
  const navigate = useNavigate();
  const doctors = useAppSelector((state) => state.doctors.doctors);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fechDoctors());
  }, [dispatch]);

  const doctorsList = doctors.map((doctor) => (
    <button
      key={doctor.id}
      className="card col-sm-12 col-md-2 col-lg-4"
      style={{ width: '25rem', height: '25rem' }}
      type="button"
      onClick={() => {
        navigate(`${doctor.id}`);
      }}
    >
      <img src={doctor.image} alt={doctor.name} className="card-img-top" style={{ height: '10rem' }} />
      <div className="card-body d-flex justify-content-between flex-column">
        <h5 className="card-title">{doctor.name}</h5>
        <hr />
        <p className="card-text">{doctor.bio}</p>
        <div className="social-media">
          <a href={doctor.social_media?.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook p-1 mx-2 h5 text-dark" />
          </a>
          <a href={doctor.social_media?.twitter} aria-label="Twitter" target="_blank" rel="noreferrer">
            <i className="bi bi-twitter p-1 mx-2 h5 text-dark" />
          </a>
          <a href={doctor.social_media?.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram p-1 mx-2 h5 text-dark" />
          </a>
        </div>
      </div>
    </button>

  ));

  return (
    <div className="vh-100 d-flex flex-column justify-content-center pt-5">
      <h1 className="h1 d-flex justify-content-center mb-5">Qualified Doctor</h1>
      {doctors && <div className="row gap-2 pt-5">{doctorsList}</div>}
    </div>
  );
};

export default Doctors;
