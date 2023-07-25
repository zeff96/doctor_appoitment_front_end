import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { showDoctors } from '../redux/doctors/doctorSlice';

const Details = () => {
  const doctor = useSelector((state) => state.doctors.details);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showDoctors(id));
  }, [dispatch, id]);

  return (
    <div className="row d-flex align-items-center">
      <div className="col-7">
        <img src={doctor.image_url} alt={doctor.name} className="img-fluid" />
      </div>
      <div className="col-5">
        <h2>{doctor.name}</h2>
        <p>{doctor.bio}</p>
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
            navigate('appointment');
          }}
        >
          appointment
        </button>
      </div>
    </div>
  );
};

export default Details;
