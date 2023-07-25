import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  return (
    <div className="d-flex flex-column">
      {/* <Navbar /> */}
      <h1 className="h1 d-flex justify-content-center">Qualified Doctor</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="carousel slide" id="carouselExampleIndicators" data-ride="carousel">
              <ol className="carousel-indicators">
                <li className="active" data-target="#carouselExampleIndicators" data-slide-to="0" />
                <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <ul className="row list-group list-group-flush list-group-horizontal">
                    {doctors.map((doctor) => (
                      <li key={doctor.id} className="col-md-4 list-group-item">
                        <button
                          className="doctors-card card single-box"
                          type="button"
                          onClick={() => {
                            navigate(`${doctor.id}`);
                          }}
                        >
                          <div className="circle-color card-body img-area">
                            <img src={doctor.image_url} alt={doctor.name} className="rounded-circle card-img-top" height="300px" />
                          </div>
                          <div className="doctors-card-details img-text">
                            <h5>{doctor.name}</h5>
                            <hr />
                            <p className="doctors-details">
                              {doctor.bio}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
