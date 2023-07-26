import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../redux/doctors/doctorSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';


function NewAppointment() {
  const dispatch = useDispatch();

  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

function NewDoctor() {
  const user = useAppSelector((state) => state.user.userData.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const implementAppointment = (e) => {
    e.preventDefault();


    const data = {

      doctor: document.getElementById('doctor'),
      date: document.getElementById('date'),
      city: document.getElementById('city'),
    };

    const formData = new FormData();
    // formData.append('appointment[doctor]', e.target.doctor.value);
    formData.append('appointment[date]', e.target.date.value);
    formData.append('appointment[city]', e.target.city.value);


    dispatch(createAppointment(JSON.parse(user).id, formData)).then((result) => {
      if (result && result.error) return;
      navigate('/doctors');
    });
    e.target.reset();
  };

  return (
    <div>

      <h1>Add Doctor</h1>
      <form className="add-form w-60" onSubmit={addAppointment}>
        <input

      <h1>Add Appointment</h1>
      <form onSubmit={implementAppointment}>
        {/* <input
          id="doctor"
          placeholder="doctor"
          type="text"
          name="doctor"
          className="form-control mb-3"
          required
          autoComplete="doctor"
        /> */}

        <input
          id="date"
          name="date"
          className="form-control mb-3"
          placeholder="Add date"
          type="date"
          required
          autoComplete="date"
        />

        <input
          id="city"
          name="city"
          className="form-control mb-3"
          placeholder="Add city"
          type="text"
          required
          autoComplete="city"
        />

        <button type="submit" className="btn btn-primary">Create Appointment</button>

      </form>
    </div>
  );
}

export default NewDoctor;
