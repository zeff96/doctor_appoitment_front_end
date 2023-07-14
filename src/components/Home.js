import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fechDoctors } from '../redux/doctors/doctorSlice';

function Greeting() {
  const doctors = useSelector((state) => state.doctors.doctors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fechDoctors());
  }, [dispatch]);

  return (
    <div>
      <h1>
        {' '}
        {doctors.image_url}
      </h1>
    </div>
  );
}

export default Greeting;
