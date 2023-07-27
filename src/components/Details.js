import { React, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showDoctors } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const Details = () => {
  const doctor = useAppSelector((state) => state.doctors.details);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(showDoctors(id));
  }, [dispatch, id]);

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-6 col-md-8 col-sm-10 d-flex justify-content-center align-items-center">
        <img src={doctor.image} alt={doctor.name} className="img-fluid img-thumbnail" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
      </div>
      <div className="col-lg-4 col-md-8 col-sm-10 mt-5">
        <h2>{doctor.name}</h2>
        {doctor && doctor.location && doctor.payment && (
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Address</td>
                <td>{doctor.location.address}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{doctor.location.city}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{doctor.location.state}</td>
              </tr>
              <tr>
                <td>Zip Code</td>
                <td>{doctor.location.zip_code}</td>
              </tr>
              <tr>
                <td>Payment amount</td>
                <td>{doctor.payment.amount}</td>
              </tr>
            </tbody>
          </table>
        )}
        <button
          className="btn btn-info btn-appointment rounded-pill text-light h3 mt-3"
          type="button"
          onClick={() => {
            navigate('/doctors/new_appointment');
          }}
        >
          Make an Appointment
        </button>
      </div>
    </div>
  );
};

export default Details;
