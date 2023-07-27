import React, { useEffect, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { fechDoctors } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Doctors = () => {
  const doctors = useAppSelector((state) => state.doctors.doctors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  useEffect(() => {
    dispatch(fechDoctors());
  }, [dispatch]);

  const scrollRight = () => {
    sliderRef.current.slickNext();
  };

  const scrollLeft = () => {
    sliderRef.current.slickPrev();
  };

  function getRandomColor() {
    const r = Math.floor(Math.random() * 155) + 100;
    const g = Math.floor(Math.random() * 155) + 100;
    const b = Math.floor(Math.random() * 155) + 100;
    return `rgb(${r}, ${g}, ${b})`;
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: Math.min(3, doctors.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: Math.min(2, doctors.length),
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (doctors.length === 0) {
    return <div>Doctors Loading...</div>;
  }

  return (
    <section className="home-page">
      <h1>QUALIFIED DOCTORS</h1>
      <p className="home-page-text">Please select a Doctor</p>
      <div className="carousel-container">
        <div className="carousel-doctor">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider ref={sliderRef} {...settings}>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctors-list">
                <button
                  className="details-link"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`${doctor.id}`);
                  }}
                >
                  <div className="doctor-card">
                    <div
                      className="circle-color"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="doctor-image"
                      />
                    </div>
                    <div className="doctors-card-details">
                      <h5 className="doctor-name">{doctor.name}</h5>
                      <p className="dots">..............................</p>
                      <p className="doctor-details">
                        {doctor.bio.slice(0, 30)}
                        {doctor.bio.length > 30 && '...'}
                      </p>
                      <div className="social-media">
                        <Link href={doctor.social_media?.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                          <i className="bi bi-facebook p-1 mx-2 h5 text-dark" />
                        </Link>
                        <Link href={doctor.social_media?.twitter} aria-label="Twitter" target="_blank" rel="noreferrer">
                          <i className="bi bi-twitter p-1 mx-2 h5 text-dark" />
                        </Link>
                        <Link href={doctor.social_media?.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                          <i className="bi bi-instagram p-1 mx-2 h5 text-dark" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </Slider>
          <div className="carousel-buttons">
            <button type="button" className="btn-doctor2" onClick={scrollLeft}>
              <BiSolidLeftArrow />
            </button>
            <button type="button" className="btn-doctor" onClick={scrollRight}>
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
