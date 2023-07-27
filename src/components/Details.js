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
    <div className="row d-flex align-items-center">
      <div className="col-7 d-flex justify-content-center align-items-center vh-100">
        <img src={doctor.image} alt={doctor.name} className="img-fluid img-thumbnail text-align-center" width="300px" height="200px" />
      </div>
      <div className="col-5 d-flex flex-column justify-content-start align-items-start mt-5 mb-auto">
        <h2 className="mt-5">{doctor.name}</h2>
        {doctor && doctor.location && doctor.payment && (
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>address</td>
                <td className="text-end">{doctor.location.address}</td>
              </tr>
              <tr>
                <td>city</td>
                <td className="text-end">{doctor.location.city}</td>
              </tr>
              <tr>
                <td>state</td>
                <td className="text-end">{doctor.location.state}</td>
              </tr>
              <tr>
                <td>zip_code</td>
                <td className="text-end">{doctor.location.zip_code}</td>
              </tr>
              <tr>
                <td>Payment amount</td>
                <td className="text-end">{doctor.payment.amount}</td>
              </tr>
            </tbody>
          </table>
        )}
        <button
          className="btn btn-info btn-appointment rounded-pill text-light h3"
          type="button"
          onClick={() => {
            navigate('/doctors/new_appointment');
          }}
        >
          appointment
        </button>
      </div>
    </div>
  );
};

export default Details;
