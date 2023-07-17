import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { showDoctors } from '../redux/doctors/doctorSlice';

const Details = () => {
  const doctors = useSelector((state) => state.doctors.doctors);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showDoctors(id));
  }, [dispatch, id]);

  return (
    <div className="row">
      <div className="col-8">
        <img src={doctors.image_url} alt={doctors.name} width="300" height="300" />
      </div>
      <div className="col-4">
        <h2>{doctors.name}</h2>
        <p>{doctors.bio}</p>
        <p>Location</p>
        {doctors && doctors.location && doctors.payment && (
          <>
            <p>
              Address:
              {' '}
              {doctors.location.address}
            </p>
            <p>
              City:
              {' '}
              {doctors.location.city}
            </p>
            <p>
              State:
              {' '}
              {doctors.location.state}
            </p>
            <p>
              State:
              {' '}
              {doctors.location.zip_code}
            </p>
            <p>
              Amount:
              {' '}
              {doctors.payment.amount}
            </p>
          </>
        )}
        <button
          className="btn-appointment"
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
