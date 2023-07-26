import { useEffect } from 'react';
import Carousel from '@itseasy21/react-elastic-carousel';
import { useNavigate } from 'react-router-dom';
// import {
//   BiLogoYoutube, BiLogoFacebookSquare, BiLogoInstagram, BiSolidLeftArrow, BiSolidRightArrow,
// } from 'react-icons/bi';
import { fechDoctors } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Doctors = () => {
  const navigate = useNavigate();
  const doctors = useAppSelector((state) => state.doctors.doctors);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fechDoctors());
  }, [dispatch]);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center">
      {/* <Navbar /> */}
      <h1 className="h1 d-flex justify-content-center mb-5">Qualified Doctor</h1>
      <Carousel breakPoints={breakPoints}>
        {doctors.map((doctor) => (
          <button
            key={doctor.id}
            className="doctors-card card border-white"
            type="button"
            onClick={() => {
              navigate(`${doctor.id}`);
            }}
          >
            <div className="circle-color card-body img-area d-flex m-auto">
              <img src={doctor.image_url} alt={doctor.name} className="rounded card-img-top" height="200px" />
            </div>
            <div className="doctors-card-details img-text">
              <h5>{doctor.name}</h5>
              <hr />
              <p className="doctors-details">
                {doctor.bio}
              </p>
              <div className="social-media">
                <a href={doctor.social_media?.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><i className="bi bi-facebook p-1 mx-2 h5 text-dark" /></a>
                <a href={doctor.social_media?.twitter} aria-label="Twitter" target="_blank" rel="noreferrer"><i className="bi bi-twitter p-1 mx-2 h5 text-dark" /></a>
                <a href={doctor.social_media?.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><i className="bi bi-instagram p-1 mx-2 h5 text-dark" /></a>
              </div>
            </div>
          </button>
        ))}
      </Carousel>
    </div>
  );
};

export default Doctors;
